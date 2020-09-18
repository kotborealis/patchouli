# Literate examples

Define function:
```js
this.fn = (x) => Math.sin(x);
```

Return value:
```js
return fn(0);
```

Return string:
```js
return "Hello, world!";
```

Print something:
```js
console.log(1,2,3);
console.log("Hello", "world");
```

Print something and return:
```js
console.log({a: 1, b: "Кириллица?"});
return Math.PI;
```

Do not eval code block:
```{.js .noeval}
console.log({a: 1, b: "Кириллица?"});
return Math.PI;
```

Do not print code block, but print results:
```js {.hide}
console.log({a: 1, b: "Кириллица?"});
return Math.PI;
```

Plot something:
```js
const plotter = new Plotter;
return await plotter.plot({data: [[0,0], [10,10], [20,20]]});
```

Plot with reference to it (see \ref{fig:plot-example}):
```js
const plotter = new Plotter;
const plot = await plotter.splot({data: [[0,0,0], [10,10,20], [20,20,100]]});
plot.caption = "Example of plot with caption & label";
plot.label = "plot-example";
return plot;
```

Can we have a table? (see \ref{table:example-table})
```js
const data = [
   ["Oh hi mark", "$\\omega$", "!"],
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9]
];

const table = new BlockTable(data);
table.caption = "Example of table with caption & label"
table.label = "example-table"
return table
```