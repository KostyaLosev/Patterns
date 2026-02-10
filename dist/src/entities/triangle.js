import { Shape } from './shape.js';
export class Triangle extends Shape {
    a;
    b;
    c;
    constructor(id, a, b, c) {
        super(id, 'triangle');
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
