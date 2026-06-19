markdown
  
# ent

基于 [Pyodide](https://github.com/pyodide/pyodide) 构建的浏览器端 Python 运行环境，纯静态前端实现，无需后端服务，在浏览器内即可直接执行 Python 代码。

## 在线访问

项目已部署，可直接访问体验：

> [https://entropy.cn.mt/](https://entropy.cn.mt/)

## 仓库结构

 
 
ent/
├── pyodide/       # Pyodide 运行时资源目录
├── index.html     # 页面入口文件
├── script.js      # 前端逻辑与交互代码
├── styles.css     # 页面样式文件
├── CNAME          # GitHub Pages 自定义域名配置
└── LICENSE        # Apache-2.0 开源许可证
 
plaintext
  

## 本地运行

本项目为纯静态项目，使用任意静态文件服务即可在本地启动：

1. 克隆仓库
```bash
git clone https://github.com/Entropy100/ent.git
cd ent
 
 
2. 启动静态服务（以 Python 为例）
 

```bash
python -m http.server 8080
 
 
3. 在浏览器中打开  > [http://localhost:8080](http://localhost:8080)  即可使用
 
技术依赖
 
- Pyodide — 将 CPython 编译为 WebAssembly，实现浏览器端原生 Python 运行
- HTML / CSS / JavaScript — 前端基础技术栈
 
许可证
 
本项目采用 Apache License 2.0 许可证开源，完整协议内容请查看 LICENSE 文件。
 
