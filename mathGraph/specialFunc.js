function unitStep(t) {//單位步階
    return t >= 0 ? 1 : 0;
}

function unitImpulse(t) {//單位脈衝
    return Math.abs(t) < 0.01 ? 1 : 0;
}

function e(t) {//回傳e^t
    return Math.E ** t;
}

function integral(f, min, max) {//對f函數從min積到x
    let ans = 0;
    for (let i = min; i <= max; i += 1 / blockSizeX) {
        ans += f(i);
    }
    return ans / blockSizeX;
}

function sum(f, min, max) {//總和
    let ans = 0;
    for (let i = min; i <= max; i += 1) {
        ans += f(i);
    }
    return ans;
}

function factorial(x) {//階層
    let ans = 1;
    for (let i = 1; i <= x; i++) {
        ans *= i;
    }
    return ans;
}

function convolution(x_f, h_f, x, m = mode_setting, max = 10) {
    let f = function (n) {
        return x_f(n) * h_f(x - n);
    };
    if (m == mode.continuous) {
        return integral(f,-max, max);
    } else if (m == mode.discrete) {
        return sum(f,-max, max);
    }
}