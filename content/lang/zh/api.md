---
layout: home
title: Blade
show_title: false
toc: false
---


<jumbotron>
    <h1>
        <img src="/assets/logo.svg" alt="blade"/>
    </h1>
   <h1 style="font-size: 35px">轻量级、高性能、简洁优雅的Web框架</h1>
    
    <p>
        <a href="/guide/getting-started" class="home-button">如何开始</a>
        <!-- <span class="home-button-sep">&nbsp; • &nbsp;</span> -->
        <!-- <a href="/guide/switching-to-preact" class="home-button">切换到 preact</a> -->
    </p>
    <p>
        <github-stars user="biezhi" repo="blade">5,000+</github-stars>
        <github-forks user="biezhi" repo="blade">5,000+</github-forks>
    </p>
</jumbotron>


<section class="home-top">
    <h1>简洁优雅的库</h1>
</section>


<section class="home-section">
    <img src="/assets/home/metal.svg">

    <h2>更高效的开发速度</h2>

    <p>
		Blade 基于 Java8 开发，为个人开发者打造的轻量级 MVC 框架，
		你只需要创建普通的 Maven 工程即可完成一个简单的应用。
    </p>

    <p>
		Blade 内部帮你做了很多事，你在使用的时候会感到非常轻便。
		结合官网录制的视频课程学习起来更快，良好的社区支持让你不会困惑。
    </p>
</section>


<section class="home-section">
    <img src="/assets/home/size.svg">

    <h2>超小体积</h2>

    <p>
		大多数 Java Web 框架是相当庞大的，让你从下手那一步有点摸不着头脑。<br/>
		Blade 不同：它的源代码不到 <code>500kb</code>，<em > 你的代码</em > 是你的应用程序最大的部分。
    </p>

    <p>
		这将意味可以下载更少的 Java 代码，解析和执行 - 为您的代码节省更多的时间，所以你可以构建一个你定义的体验，而不需要受一个框架的控制.
    </p>
</section>


<section class="home-section">
    <img src="/assets/home/performance.svg">

    <h2>高性能</h2>

    <p>
		Blade 是快速的，不仅是因为他的体积，内部Web容器是基于 <code>Netty4</code> 实现的，使它在100并发下tps可以达到 <code>6w/s</code>。
    </p>

    <p>
        很多时候我们并不关心性能问题，但 Blade 为什么不做到这点呢？
    </p>
</section>


<section class="home-section">
    <img src="/assets/home/portable.svg">

    <h2>轻量 &amp; 可扩展</h2>

    <p>
        Blade 遵循『<b>约定优于配置</b>』，按照一套统一的约定进行应用开发，采用这种方式可以减少开发者的学习成本，开发者不再是『钉子』，可以流动起来。
    </p>

    <p>
        Blade 为开发者提供了诸如 <code>WebHook</code>、<code>BeanProccessor</code> 这样的扩展接口，
        你可以根据自己的需求开发自己的中间件。
    </p>
</section>


<section class="home-section">
    <img src="/assets/home/productive.svg">

    <h2>灵活的路由</h2>

    <p>
        在 Blade 中接收客户端请求的就是路由，你可以定义不同的路由来满足各种开发需求。
    </p>
    
    <p>
        Blade 支持硬编码编写一个路由，同时也支持像 SpringMvc 那样以注解驱动。
    </p>
    
</section>


<section class="home-section">
    <img src="/assets/home/compatible.svg">

    <h2>更方便部署</h2>

    <p>
        由于 Blade 内置了 WebServer，意味着你不需要在服务器搭建一个 Web 服务器了。
        因为使用 Maven 构建项目，那么就可以将工程打成 Jar 包直接运行。
    </p>
    
</section>


<section class="home-top">
    <h1>『码』上见分晓</h1>
</section>

<section class="home-split">
    <div>
        <h2>第一个程序：Hello World</h2>
        <pre><code class="lang-java">
public static void main(String[] args) {
    Blade.me().get("/", (req, res) -> {
        res.text("Hello Blade");
    }).start();
}

        </code></pre>
    </div>
    
    <div>
        <h2>注册路由</h2>
        <pre repl="false"><code class="lang-java">
public static void main(String[] args) {
    Blade.me()
        .get("/user/21", getting)
        .post("/save", posting)
        .delete("/remove", deleting)
        .put("/putValue", putting)
        .start();
}
        </code></pre>
    </div>
</section>


<section class="home-split">
    <div>
        <h2>获取 Rest Url 参数</h2>
        <pre><code class="lang-java">
public static void main(String[] args) {
    Blade blade = Blade.me();
    // Create a route: /user/:uid
    blade.get("/user/:uid", (request, response) -> {
		Integer uid = request.pathInt("uid");
		response.text("uid : " + uid);
	});
	
    // Create two parameters route
    blade.get("/users/:uid/post/:pid", (request, response) -> {
		Integer uid = request.pathInt("uid");
		Integer pid = request.pathInt("pid");
		String msg = "uid = " + uid + ", pid = " + pid;
		response.text(msg);
	});
	
    // Start blade
    blade.start();
}
        </code></pre>
    </div>
    
    <div>
        <h2>上传文件</h2>
        <pre repl="false"><code class="lang-java">
public void upload(@MultipartParam FileItem fileItem){
    byte[] data = fileItem.getData();
    // Save the temporary file to the specified path
    Files.write(Paths.get(filePath), data);
}
        </code></pre>
        <p>或者</p>
        <pre repl="false"><code class="lang-java">
        public void upload(Request request){
            request.fileItem("img").ifPresent(fileItem -> {
                byte[] data = fileItem.getData();
                // Save the temporary file to the specified path
                Files.write(Paths.get(filePath), data);              
            });
        }
                </code></pre>
    </div>
</section>

<section class="home-top">
    <h1>准备入坑了？</h1>
</section>

<section style="text-align:center;">
    <p>
        快和小伙伴们一起玩这个小巧的框架吧 :_)
    </p>
    <p>
        <a href="/guide/getting-started" class="home-button">如何开始</a>
        <!-- <span class="home-button-sep">&nbsp; • &nbsp;</span> -->
        <!-- <a href="/guide/switching-to-preact" class="home-button">切换到 Preact</a> -->
    </p>
</section>
