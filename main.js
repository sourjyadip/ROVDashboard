const { app, BrowserWindow } = require('electron')
const rclnodejs = require('rclnodejs')

//let count = 1

//app.allowRendererProcessReuse = false

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  var message = {}
  var image = []
  rclnodejs.init().then(() => {
    const node = rclnodejs.createNode('subscription_example_node');
    
    node.createSubscription('sensor_msgs/msg/Imu', '/rexrov/imu', (msg) => {
    //console.log(`Received message: ${typeof msg['orientation']}`, msg['orientation']);
    message = msg
    
    win.webContents.send('imu', message)
      //console.log(count)
      //count += 1
    });
    node.createSubscription('sensor_msgs/msg/Image', '/rexrov/camera/image_raw', (m) => {
        //image = msg['data']
        console.log("msg received")
    })
    node.spin();
    });
    

  // and load the index.html of the app.
  win.loadFile('connect.html')
}
app.whenReady().then(createWindow)

