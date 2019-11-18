# 工程构建
    1. 安装webpack webpack-cli
    2. 安装html-webpack-plugin
    3. 安装clean-webpack-plugin
    4. 安装webpack-dev-server
    5. 安装ts相应的loader  ts-loader/awsome-typescript-loader  他们依赖typescript

# 单一职能原则：每个类只做跟他相关的一件事；
# 开闭原则： 系统中的类，对扩展开放，对修改关闭；

基于以上两个原则，系统中使用如下模式：
    数据-界面分离模式
    传统面向对象语言 书写类的属性时 会进行如下操作：
        1.所有的属性私有化；
        2.使用公开的方法提供对属性的访问；

# 开发小方块类
    能处理自己的数据 知道什么时候显示 不知道什么时候显示