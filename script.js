const lights = document.querySelectorAll('.light');
const bike = document.querySelector('.bike');
const scooter = document.querySelector('.scooter')

let index = 0;

const INITIAL_POSITIONS = {
  bike: -500,
  scooter: -800,
};

let positions = { ...INITIAL_POSITIONS };

const STOP_LINE = 200;
const SCREEN_LIMIT = window.innerWidth + 100;

function updateLights() {
  lights.forEach(light => light.classList.remove('active'));

  if (index === 0) {
    lights[0].classList.add('active'); // Red
  } else if (index === 1) {
    lights[1].classList.add('active'); // Yellow
  } else {
    lights[2].classList.add('active'); // Green
  }

  index = (index + 1) % 3;
}

function moveVehicle(vehicleName, element, speed) {
  const isRed = lights[0].classList.contains('active');
  let position = positions[vehicleName];

  if (position > STOP_LINE || !isRed) {
    position += speed;

    // Hide when out of screen
    if (position > SCREEN_LIMIT) {
      element.style.visibility = 'hidden'; // hide before resetting
      position = INITIAL_POSITIONS[vehicleName]; // reset to start
    }

    positions[vehicleName] = position;
    element.style.left = position + 'px';

    // Show only when re-entering from left
    if (position >= -100 && position <= SCREEN_LIMIT) {
      element.style.visibility = 'visible';
    }
  }
}

function moveVehicles() {
  moveVehicle('bike', bike, 15);
  moveVehicle('scooter', scooter, 12);
}

setInterval(updateLights, 3000);
updateLights();
setInterval(moveVehicles, 50);

