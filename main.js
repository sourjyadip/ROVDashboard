const { app, BrowserWindow } = require('electron')
const rclnodejs = require('rclnodejs')
//let count = 1

app.allowRendererProcessReuse = false

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
    node.createSubscription('sensor_msgs/msg/Image', '/rexrov/camera/image_raw', {isRaw : true }, (m) => {
        //image = msg['data']
        img = new Uint8ClampedArray(m);
        img = img.slice(64);
        // 492 768 2304
        //console.log(img);
        win.webContents.send('image',img);

    })
    node.createSubscription('sensor_msgs/msg/Image', '/rexrov/cameraright/image_raw', {isRaw : true }, (camera2) => {
      //image = msg['data']
      img2 = new Uint8ClampedArray(camera2);
      img2 = img2.slice(72);
      // 492 768 2304
      //console.log(img);
      win.webContents.send('image2',img2);

  })
  node.createSubscription('uuv_sensor_ros_plugins_msgs/msg/DVL', '/rexrov/dvl', (dvl) => {
    //image = msg['data']
    //console.log(velocity);
    win.webContents.send('velocity', dvl);

})
node.createSubscription('sensor_msgs/msg/FluidPressure', '/rexrov/pressure', (pressure) => {
  //image = msg['data']
  //console.log(velocity);
  win.webContents.send('pressure', pressure);

})
    node.spin();
    });
    

  // and load the index.html of the app.
  win.loadFile('connect.html')
}
app.whenReady().then(createWindow)

