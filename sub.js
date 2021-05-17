//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
const Jimp = require('jimp')

const ipc = require('electron').ipcRenderer

function quat2eu(x,y,z,w) {
    t0 = +2.0 * (w * x + y*z);
    t1 = +1.0 - 2.0 * (x * x + y * y)
        roll_x = Math.atan2(t0, t1)

        t2 = +2.0 * (w * y - z * x)
    if( t2 > 1.0 ){
       t2 = 1.0;
    }
    if( t2 < -1.0){
       t2 = -1.0;
    }
        pitch_y = Math.asin(t2)

        t3 = +2.0 * (w * z + x * y)
        t4 = +1.0 - 2.0 * (y * y + z * z)
        yaw_z = Math.atan2(t3, t4)

  return [roll_x , pitch_y , yaw_z];
}


ipc.on('imu', (event, message) => {
  x = message['orientation']['x'];
    y = message['orientation']['y'];
    z = message['orientation']['z'];
    w = message['orientation']['w'];

    eu_angles = quat2eu(x,y,z,w);
    
    document.getElementById('roll').innerHTML = "Roll : " + Number.parseFloat((eu_angles[0]*180)/Math.PI).toFixed(2);
    document.getElementById('pitch').innerHTML = "Pitch : " + Number.parseFloat((eu_angles[1]*180)/Math.PI).toFixed(2);
    document.getElementById('yaw').innerHTML = "Yaw : " + Number.parseFloat((eu_angles[2]*180)/Math.PI).toFixed(2);
})

ipc.on('image',(event,image) => {
  image = new Jimp({ data: image, width: 768, height: 492 });
  image.scaleToFit(500,500);
  imageData = new ImageData(
    Uint8ClampedArray.from(image.bitmap.data),
    image.bitmap.width,
    image.bitmap.height
);
  var canvas = document.getElementById("camera1");
  var ctx = canvas.getContext('2d');

  ctx.putImageData(imageData,0,0);
})

ipc.on('image2',(event,image2) => {
  image2 = new Jimp({ data: image2, width: 768, height: 492 });
  image2.scaleToFit(500,500);
  imageData2 = new ImageData(
    Uint8ClampedArray.from(image2.bitmap.data),
    image2.bitmap.width,
    image2.bitmap.height
);
  var canvas2 = document.getElementById("camera2");
  var ctx2 = canvas2.getContext('2d');

  ctx2.putImageData(imageData2,0,0);
})

ipc.on('velocity', (event, dvl) => {
  x = dvl['velocity']['x'];
  y = dvl['velocity']['y'];
  z = dvl['velocity']['z'];
  document.getElementById('x').innerHTML = "X : " + Number.parseFloat(x*100).toFixed(2) +"m/s";
  document.getElementById('y').innerHTML = "Y : " + Number.parseFloat(y*100).toFixed(2) +"m/s";
  document.getElementById('z').innerHTML = "Z : " + Number.parseFloat(z*100).toFixed(2) +"m/s";
})

ipc.on('pressure', (event, pressure) => {
  P = pressure['fluid_pressure'];
  depth = P / 10038.08694 ;
  document.getElementById('depth').innerHTML = "DEPTH: " + Number.parseFloat(depth*100).toFixed(2) + 'm';
  
})

