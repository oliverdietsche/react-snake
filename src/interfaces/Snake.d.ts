import { ICoordinate } from './Coordinate.d';

export interface ISnake {
	head: ICoordinate;
	tail: ICoordinate[];
}
