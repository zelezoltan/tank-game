class Polynomial{
    constructor(coefficients){
        this.coefficients = coefficients;
        let i = coefficients.length - 1;
        while(this.coefficients[i] == 0 && i>0){
            this.coefficients.pop();
            --i;
        }
        this.degree = this.coefficients.length-1; 
    }

    add(other){
        for(let i = 0; i <= other.degree; ++i){
            if(this.degree >= i){
                this.coefficients[i] += other.coefficients[i];
            }else{
                this.coefficients.push(other.coefficients[i]);
            }
        }
        let i = this.degree;
        while(this.coefficients[i] == 0 && i>0){
            this.coefficients.pop();
            --i;
        }
        this.degree = this.coefficients.length-1;   
    }

    multiply(other){
        if(this.degree == 0 && this.coefficients[0] == 0 || other.degree == 0 && other.coefficients[0] == 0){
            this.degree = 0;
            this.coefficients = [0];
            return;
        }
        let degree = this.degree+other.degree;
        
        let coefficients = [];
        for(let i = 0; i <= degree; ++i){
            coefficients.push(0);
        }
        
        for(let i = 0; i <= this.degree; ++i){
            for(let j = 0; j <= other.degree; ++j){
                coefficients[i+j] += this.coefficients[i] * other.coefficients[j];
            }
        }
        this.degree = degree;
        this.coefficients = coefficients;
    }

    divideByScalar(scalar){
        for(let i = 0; i <= this.degree; ++i){
            this.coefficients[i] = this.coefficients[i]/scalar;
        }
    }

    multiplyByScalar(scalar){
        for(let i = 0; i <= this.degree; ++i){
            this.coefficients[i] = this.coefficients[i]*scalar;
        }
    }

    at(scalar){
        let result = 0;
        for(let i = 0; i <= this.degree; ++i){
            result += Math.pow(scalar, i)*this.coefficients[i];
        }
        return result;
    }

    derivative(){
        const coefficients = [];
        for(let i = 1; i <= this.degree; ++i){
            coefficients.push(this.coefficients[i]*i);
        }
        return new Polynomial(coefficients);
    }
}

/*const Pol1 = new Polynomial([0,1,3]);
const Pol2 = new Polynomial([2,2,0,-3]);

Pol1.multiply(Pol2);
console.log(Pol1.coefficients);*/