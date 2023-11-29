# Fastshift-github-fastgit
## 主要功能：通过浏览器脚本快速切换Github与fastGit

* 因为懒得每次在github~~网速不佳~~懂得都懂，懒得开梯子或者手动输入fastgit写的（一个书签栏点一下多省心）
* 采用书签运行javascrip解决
* 以后大概会写切换，不过现在个人需求好像就直接切到fastgit，所以~~开摆~~写简单点。
* 仅支持 github.com，不支持其他的站点（下载啥的有别人写的脚本啊https://github.com/RC1844/FastGithub ）主要是为了打不开又不想费事写的
* ~~我废话好像有亿点多~~
 
## 好像就几句话就贴源码吧
### ~~TMD给我玩阴滴是吧，git上传又寄了~~
#### 复制以下内容，新建收藏即可
（似乎Github Readme安全策略无法插入aref=，我还琢磨了半天为什么Github上点不起（悲））
~~~
javascript: (function() {
  window.open(window.location.href.replace("github.com", "hub.fastgit.xyz"));
  })()
~~~

### 后续计划
- [ ] 支持两者互换
- [ ] 加入对于其他链接的支持
