// Test script for the real-time chat application
const io = require('socket.io-client');

console.log('🧪 Testing Real-Time Chat Application...\n');

// Connect to the chat server
let socket = io('http://localhost:4001');

// Test data
const testUsers = [
  { username: 'Alice', avatar: 'https://ui-avatars.com/api/?name=Alice&background=ff6b6b' },
  { username: 'Bob', avatar: 'https://ui-avatars.com/api/?name=Bob&background=4ecdc4' },
  { username: 'Charlie', avatar: 'https://ui-avatars.com/api/?name=Charlie&background=45b7d1' }
];

let currentTest = 0;

// Run tests sequentially
function runNextTest() {
  if (currentTest >= testUsers.length) {
    console.log('✅ All tests completed successfully!');
    process.exit(0);
  }

  const user = testUsers[currentTest];
  testUser(user);
}

function testUser(user) {
  console.log(`🔍 Testing user: ${user.username}`);
  
  // Authenticate user
  socket.emit('authenticate', user);

  // Listen for authentication response
  socket.on('authenticated', (data) => {
    if (data.user && data.user.username === user.username) {
      console.log(`✅ ${user.username} authenticated successfully`);
      
      // Test sending a message
      setTimeout(() => {
        socket.emit('send_message', {
          roomId: 'global',
          content: `Hello from ${user.username}!`,
          type: 'text'
        });
        
        console.log(`📤 ${user.username} sent a message`);
        
        // Wait a bit then test next user
        setTimeout(() => {
          currentTest++;
          socket.disconnect();
          
          // Create new connection for next user
          const newSocket = io('http://localhost:4001');
          socket = newSocket; // Reassign socket variable
          runNextTest();
        }, 2000);
      }, 1000);
    }
  });

  // Listen for messages
  socket.on('receive_message', (message) => {
    console.log(`📥 ${message.sender.username} received: "${message.content}"`);
  });
}

// Start testing
socket.on('connect', () => {
  console.log('✅ Connected to chat server');
  runNextTest();
});

// Handle connection errors
socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

// Set timeout for tests
setTimeout(() => {
  console.log('⏰ Test timeout reached');
  process.exit(1);
}, 30000);