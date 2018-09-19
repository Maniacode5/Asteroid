import Vector from "./Vector"

export function positionLoop(screen, position, boundingRect) {
    const mapBounding = document.getElementById(screen).getBoundingClientRect();

    if (boundingRect.right > mapBounding.right + boundingRect.width * 1.1) {
        position = Vector.fromCoordinates(5 - boundingRect.width, position.coordinates.y);
    }
    else if (boundingRect.left < mapBounding.left - boundingRect.width * 1.1) {
        position = Vector.fromCoordinates(5 + mapBounding.width, position.coordinates.y);
    }
    else if (boundingRect.bottom > mapBounding.bottom + boundingRect.height * 1.1) {
        position = Vector.fromCoordinates(position.coordinates.x, 5 - boundingRect.height);
    }
    else if (boundingRect.top < mapBounding.top - boundingRect.height * 1.1) {
        position = Vector.fromCoordinates(position.coordinates.x, 5 + mapBounding.height);
    }

    return position;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
