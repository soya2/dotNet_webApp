# Web音乐播放器

此为学生作业
### 快速启动
在终端中输入`node app.js`后通过`127.0.0.1：80`访问
> **注意事项**  
> 本项目需要Node环境，可通过 https://nodejs.org/zh-cn/download/ 下载

### index页面
index页面采用卡片式的设计，通过拖拽顶层的卡片来进行交互。  
拖拽的距离小于一定值时会返回原位，超出一定值后会被甩出页面，同时底层的卡片会顶上来；当最后一张卡片被甩出去后第一张卡片会顶上来。  
![](https://wx1.sinaimg.cn/mw690/88a43c6fgy1glz1yx2d1lj20h40ff3z8.jpg)  
卡片式设计  
![](https://wx3.sinaimg.cn/mw690/88a43c6fgy1glz1z0hlvyj20m00hdab1.jpg)  
可拖拽交互  
![](https://wx2.sinaimg.cn/mw690/88a43c6fgy1glz1z67fgcj20mb0hpjsr.jpg)  
最后一张时第一张顶上

### detail页面
当选定某一张专辑时，可点击专辑封面下方的**点击进入专辑**跳转至相应页面。  
此处跳转采取动态路由的形式，将每张专辑的id作为路由的组成部分，并请求API获取相应的数据，所有专辑的detail页面**同一个页面**，不过会根据不同的路由显示不同数据。  
![](https://wx2.sinaimg.cn/mw690/88a43c6fgy1glz1zrpqazj209a01ewei.jpg)  
![](https://wx1.sinaimg.cn/mw690/88a43c6fgy1glz1zumx5uj2098016dfu.jpg)  
动态路由

detail页面中将会展示专辑的封面及歌曲列表，并会有相应的音频操作和返回index的按钮。点击歌曲列表右侧的**链接🔗**图标 可跳转至歌曲详细页面。  
![](https://wx2.sinaimg.cn/mw690/88a43c6fgy1glz1z9n4cij20qz0j4jsn.jpg)  
detail页面布局  
![](https://wx2.sinaimg.cn/mw690/88a43c6fgy1glz1zd10rkj20rx0j5dh4.jpg)  
点击播放后会产生相应的效果  
![](https://wx2.sinaimg.cn/mw690/88a43c6fgy1glz2cebb30j20qv0g1my8.jpg)  
点击链接按钮跳转页面  

## 源代码
源码存放在`源代码`文件夹中，可使用如vscode的编辑器或者记事本打开查看  
其中`index.vue`和`detail.vue`是网页文件，即html、css和js的部分
另外的`App.vue`和`main.js`是路由配置相关文件