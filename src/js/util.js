import Vector from "./Vector"
export function positionLoop(screen, position) {
    const mapBounding = document.getElementById(screen).getBoundingClientRect();

    if (position.coordinates.x > mapBounding.width) {
        position = Vector.fromCoordinates(0, position.coordinates.y);
    }
    if (position.coordinates.x < 0) {
        position = Vector.fromCoordinates(mapBounding.width, position.coordinates.y);
    }
    if (position.coordinates.y > mapBounding.height) {
        position = Vector.fromCoordinates(position.coordinates.x, 0);
    }
    if (position.coordinates.y < 0) {
        position = Vector.fromCoordinates(position.coordinates.x, mapBounding.height);
    }

    return position;
}
