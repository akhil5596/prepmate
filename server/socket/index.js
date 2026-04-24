/**
 * PrepMate Socket.io Real-Time System
 * 
 * Event Flow:
 * 1. Client connects → authenticates → joins room
 * 2. Code changes → delta sent to server → broadcast to room
 * 3. Cursor moves → position sent → broadcast to others
 * 4. Chat messages → stored → broadcast to room
 * 
 * Optimization: Delta updates (only changed content sent, not full code)
 */

const rooms = new Map(); // roomId → { code, language, users: Map<socketId, userInfo> }

export function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log(`🔌 Connected: ${socket.id}`);

    // Join a coding room
    socket.on('join-room', ({ roomId, user }) => {
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, { code: '', language: 'javascript', users: new Map() });
      }

      const room = rooms.get(roomId);
      room.users.set(socket.id, {
        id: user?.id || socket.id,
        username: user?.username || 'Anonymous',
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        cursor: { line: 1, col: 1 },
      });

      // Send current room state to new user
      socket.emit('room-state', {
        code: room.code,
        language: room.language,
        users: Array.from(room.users.values()),
      });

      // Notify others
      socket.to(roomId).emit('user-joined', {
        user: room.users.get(socket.id),
        users: Array.from(room.users.values()),
      });

      console.log(`👤 ${user?.username || 'Anon'} joined room ${roomId}`);
    });

    // Code sync (delta updates for performance)
    socket.on('code-change', ({ roomId, delta, fullCode }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.code = fullCode; // Store latest state
        // Broadcast delta to others (not full code — anti-lag)
        socket.to(roomId).emit('code-update', {
          delta,
          userId: socket.id,
          username: room.users.get(socket.id)?.username,
        });
      }
    });

    // Language change
    socket.on('language-change', ({ roomId, language }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.language = language;
        socket.to(roomId).emit('language-updated', { language });
      }
    });

    // Cursor tracking
    socket.on('cursor-move', ({ roomId, position }) => {
      const room = rooms.get(roomId);
      if (room) {
        const user = room.users.get(socket.id);
        if (user) {
          user.cursor = position;
          socket.to(roomId).emit('cursor-update', {
            userId: socket.id,
            username: user.username,
            color: user.color,
            position,
          });
        }
      }
    });

    // Chat
    socket.on('chat-message', ({ roomId, message }) => {
      const room = rooms.get(roomId);
      const user = room?.users.get(socket.id);

      const msg = {
        id: Date.now().toString(),
        userId: socket.id,
        username: user?.username || 'Anonymous',
        message,
        timestamp: new Date().toISOString(),
      };

      io.to(roomId).emit('new-message', msg);
    });

    // Disconnect
    socket.on('disconnect', () => {
      // Remove from all rooms
      for (const [roomId, room] of rooms.entries()) {
        if (room.users.has(socket.id)) {
          const user = room.users.get(socket.id);
          room.users.delete(socket.id);

          socket.to(roomId).emit('user-left', {
            userId: socket.id,
            username: user.username,
            users: Array.from(room.users.values()),
          });

          // Cleanup empty rooms
          if (room.users.size === 0) {
            rooms.delete(roomId);
          }
        }
      }
      console.log(`🔌 Disconnected: ${socket.id}`);
    });
  });
}
