import { Vector } from 'simple-vector';

export type VectorProp = {
    name: string;
    vec: Vector;
    color: string;
    onUpdate?: (newVector: Vector) => void;
    isDraggable: boolean;
};

export type GridProp = {
    size: number;
    graduation: number;
};
