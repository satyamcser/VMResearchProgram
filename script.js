function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runPythonAnimation() {
    var prog = `
import turtle
t = turtle.Turtle()
r = turtle.Turtle()
r.penup()
r.goto(10,0)
r.pendown()
r.color("yellow")
style = ("Courier", 20, "italic")
r.hideturtle()
s = turtle.Screen()
s.bgcolor("black")
t.pencolor("white")
t.speed(0)
t.penup()
t.goto(0,55)
t.pendown()
a = 0
b = 0
while True:
    t.forward(a)
    t.right(b)
    a += 0.65
    b += 1
    if b == 206:
        break
    t.hideturtle()
turtle.done()
    `;

    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({ output: outf, read: builtinRead });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function(mod) {
        console.log("Python code executed successfully.");
    }, function(err) {
        console.log("An error occurred: ", err.toString());
    });
}

// Call the Python animation function on page load
window.onload = function() {
    runPythonAnimation();
};
