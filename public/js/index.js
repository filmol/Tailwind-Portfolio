import Highway from '@dogstudio/highway';
import Fade from './transition';

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});

      // Write function that works callable % for each bar.
      let progress = 0;
      let invervalSpeed = 1;
      let incrementSpeed = 0.4;
      let todaysDate = new Date()
      let graduationDay = new Date("June 30, 2022")
      let msPerDay = 24 * 60 * 60 * 1000 ; // Number of milliseconds per day
      let daysLeft = (graduationDay.getTime() - todaysDate.getTime()) / msPerDay;
      daysLeft = Math.round(daysLeft);
      let completed = ((1060-daysLeft)/1060)*100
      completed = completed.toFixed(0)
      document.addEventListener("DOMContentLoaded", function(){
          let bar = document.getElementById('bar');
          let progressInterval = setInterval(function(){
              progress += incrementSpeed;
              bar.style.width = progress + "%";
              if(progress >= completed){
                  clearInterval(progressInterval);
              }
          }, invervalSpeed);
      });

      // document.getElementById("grad").innerHTML += " " + daysLeft + " days"
      //   document.getElementById("grad").innerHTML += "University studies completed: " + completed + "%"