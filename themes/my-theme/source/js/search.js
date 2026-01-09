// 搜索功能实现
var searchFunc = function (path, search_id, content_id) {
    'use strict';
    fetch(path)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            var datas = [...data.querySelectorAll('entry')].map(item => {
                return {
                    title: item.querySelector('title').textContent,
                    content: item.querySelector('content').textContent,
                    url: item.querySelector('url').textContent
                };
            });
            var input = document.getElementById(search_id);
            var resultContent = document.getElementById(content_id);

            input.addEventListener('input', function () {
                var str = '<ul class=\"search-result-list\">';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                 resultContent.innerHTML = "";
                if (this.value.trim().length <= 0) {
                    return;
                }
                datas.forEach(function (data) {
                    var isMatch = true;
                    var content_index = [];
                    if (!data.title || data.title.trim() === '') {
                        data.title = "Untitled";
                    }
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var first_occur = -1;
                    // only match artiles with not empty titles
                    if (data_title !== '') {
                        keywords.forEach(function (keyword, i) {
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);

                            if (index_title < 0 && index_content < 0) {
                                isMatch = false;
                            } else {
                                if (index_content < 0) {
                                    index_content = 0;
                                }
                                if (i === 0) {
                                    first_occur = index_content;
                                }
                            }
                        });
                    } else {
                        isMatch = false;
                    }
                    if (isMatch) {
                        str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                        str += "</li>";
                    }
                });
                str += "</ul>";
                resultContent.innerHTML = str;
            });
        });
};

document.addEventListener('DOMContentLoaded', () => {
    // 这里的路径 '/search.xml' 对应 _config.yml 里的配置
    searchFunc('/search.xml', 'local-search-input', 'local-search-result');
});