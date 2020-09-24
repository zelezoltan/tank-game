class Lagrange{
    constructor(points){
        this.points = points;
    }

    interpolate(){
        const basePolynomials = [];
        for(let i = 0; i < this.points.length; ++i){
            basePolynomials.push(this.makeBasePolynomial(this.points[i]));
        }
        const interpolationPolynomial = new Polynomial([0]);
        for(let i = 0; i < basePolynomials.length; ++i){
            basePolynomials[i].multiplyByScalar(this.points[i].y);
            interpolationPolynomial.add(basePolynomials[i])
        }
        return interpolationPolynomial;
    }

    makeBasePolynomial(point){
        const pol = new Polynomial([1]);
        let scalar = 1;
        for(let i = 0; i < this.points.length; ++i){
            if(!point.equals(this.points[i])){
                pol.multiply(new Polynomial([-this.points[i].x, 1]));
                scalar *= point.x - this.points[i].x;
            }
        }
        pol.divideByScalar(scalar);
        return pol;
    }
}