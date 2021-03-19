//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
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