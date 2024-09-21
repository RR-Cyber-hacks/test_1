const fun = () => {
    console.log('1st function');
}

const fun2 = () => {
    console.log('2nd function');
}

const App = () => {
    return (
        <div>
            <button onClick={fun}>Click me 1st time</button>
            <button onClick={fun2}>Click me 2nd time</button>
             
        </div>
    )
}