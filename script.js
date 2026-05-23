let editor;
let pyodide;

async function initPyodide() {
    document.getElementById("status").textContent = "加载 Pyodide...";
    pyodide = await loadPyodide({
        indexURL: "./pyodide/"
    });
    document.getElementById("status").textContent = "就绪";
}

async function initMonaco() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});
    require(['vs/editor/editor.main'], () => {
        editor = monaco.editor.create(document.getElementById('editor'), {
            value: 'print("Hello World！")',
            language: 'python',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 15,
        });
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
    });
}

async function runCode() {
    if (!pyodide) {
        alert("Pyodide 还未加载完成");
        return;
    }

    const code = editor.getValue();
    const outputDiv = document.getElementById("output");
    outputDiv.textContent = "运行中...\n";

    try {
        // 关键修复：捕获 print 输出
        let result = await pyodide.runPythonAsync(`
            import sys
            from io import StringIO
            old_stdout = sys.stdout
            sys.stdout = mystdout = StringIO()
            
            try:
                exec("""${code.replace(/"/g, '\\"').replace(/\n/g, '\\n')}""")
                output = mystdout.getvalue()
            finally:
                sys.stdout = old_stdout
            
            output
        `);

        outputDiv.textContent = result || "执行完成（无输出）";
    } catch (err) {
        outputDiv.textContent = "错误: " + err.message;
    }
}

function exportFile() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "main.py";
    a.click();
}

function importFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py';
    input.onchange = e => {
        const reader = new FileReader();
        reader.onload = ev => editor.setValue(ev.target.result);
        reader.readAsText(e.target.files[0]);
    };
    input.click();
}

window.onload = () => {
    initPyodide();
    initMonaco();
};
