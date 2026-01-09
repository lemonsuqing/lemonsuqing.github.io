var searchFunc = function (path, search_id, content_id) {
    'use strict';
    fetch(path)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            var datas = [...data.querySelectorAll('entry')].map(item => {
                // 1. 获取文章标题、内容、URL
                let title = item.querySelector('title').textContent;
                let content = item.querySelector('content').textContent;
                let url = item.querySelector('url').textContent;
                
                // 2. 获取标签 (Tags) - 将所有标签拼成一个字符串
                let tags = [...item.querySelectorAll('tag')].map(t => t.textContent).join(" ");
                
                // 3. 获取分类 (Categories) - 将所有分类拼成一个字符串
                let categories = [...item.querySelectorAll('category')].map(c => c.textContent).join(" ");

                return {
                    title: title,
                    content: content,
                    url: url,
                    tags: tags,           // 新增
                    categories: categories // 新增
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
                    if (!data.title || data.title.trim() === '') {
                        data.title = "Untitled";
                    }
                    
                    // 准备所有需要被搜索的文本
                    var data_title = data.title.trim().toLowerCase();
                    var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                    var data_tags = data.tags.toLowerCase();          // 新增
                    var data_cats = data.categories.toLowerCase();    // 新增
                    
                    var data_url = data.url;
                    var index_title = -1;
                    var index_content = -1;
                    var index_tags = -1;      // 新增
                    var index_cats = -1;      // 新增

                    if (data_title !== '') {
                        keywords.forEach(function (keyword, i) {
                            // 在四个维度里搜索关键词
                            index_title = data_title.indexOf(keyword);
                            index_content = data_content.indexOf(keyword);
                            index_tags = data_tags.indexOf(keyword);       // 新增
                            index_cats = data_cats.indexOf(keyword);       // 新增

                            // 只要有一个维度匹配到了，就算匹配成功
                            if (index_title < 0 && index_content < 0 && index_tags < 0 && index_cats < 0) {
                                isMatch = false;
                            }
                        });
                    } else {
                        isMatch = false;
                    }

                    if (isMatch) {
                        str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                        // 如果是标签或分类匹配到的，可以给个提示（可选优化，这里暂时保持简洁）
                        str += "</li>";
                    }
                });
                str += "</ul>";
                resultContent.innerHTML = str;
            });
        });
};

document.addEventListener('DOMContentLoaded', () => {
    searchFunc('/search.xml', 'local-search-input', 'local-search-result');
});