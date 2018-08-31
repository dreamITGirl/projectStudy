/**
 * 需要引入样式文件：分级联动菜单样式.css,jquery
 * 调用方式 ：initHtml.init(dataList.dataListArr);
 * 页面结构：
 * <div class="top">
 *      <ul class="main-nav" id="main-nav"></ul>
 * </div>
 */

var dataList = {
    dataListArr: [
        {
            id: '1',
            children: [
                {
                    id: '1',
                    link: 'https://www.baidu.com/',
                    name: '百度',
                    children: [
                        {
                            id: '1',
                            link: 'https://www.baidu.com/',
                            name: '百度',
                            children: []
                        }
                    ]
                }
            ],
            link: '',
            name: '连接'
        },
        {
            id: '2',
            link: '',
            name: '啥',
            children: []
        },
        {
            id: '2',
            link: '',
            name: '啥',
            children: [
                {
                    id: '21',
                    link: '',
                    name: '啥2',
                    children: []
                }
            ]
        }
    ]
}


var initHtml = {
    init: function (data) {

        this.render(data)
    },
    render: function (data) {
        let html = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].children.length > 0) {
                var resultHtml = this.getTwoListRender(data[i].children);
                html += `<li class="item-nav"><a href="javascript:;">${data[i].name}</a>${resultHtml}</li>`;
            } else {
                html += `<li class="item-nav"><a href="${data[i].link}">${data[i].name}</a></li>`;
            }
        }
        var mainNav = document.getElementById('main-nav');
        mainNav.innerHTML = html;
    },
    getTwoListRender: function (children) {
        var twoListHtml = `<ul class="two-nav none">`;
        for (let i = 0; i < children.length; i++) {
            twoListHtml += `<li class="two-item">
                        <a href="javascript:;">${children[i].name}</a>`;
            if (children[i].children.length > 0) {
                let secondHtml = this.getThreeListRender(children[i].children);
                twoListHtml += secondHtml + '</li>'
            } else {
                twoListHtml += `</li>`
            }
        }
        twoListHtml += '</ul>';
        return twoListHtml
    },
    getThreeListRender: function (children) {
        var threeListHtml = `<ul class="three-nav none">`;
        for (let i = 0; i < children.length; i++) {
            threeListHtml += `<li class="three-item"><a href="${children[i].link}">${children[i].name}</a></li>`;
        }
        threeListHtml += `</ul>`;
        return threeListHtml
    }
}