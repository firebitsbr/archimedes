const factorial = n => n < 0 ? null : Array.from({ length: n }, (_, i) => i + 1).reduce((x, y) => x * y);