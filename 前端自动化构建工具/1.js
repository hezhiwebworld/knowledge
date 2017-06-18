/**
 * Created by hezhi on 2017/6/9.
 */

var projectData = {
    "name"  : "miao",
    "fileData" : [
        {
            'name' : 'css',
            'type' : 'dir'
        },
        {
            'name' : 'js',
            'type' : 'dir'
        },
        {
            'name' : 'images',
            'type' : 'dir'
        },
        {
            'name' : 'index.html',
            'type' : 'file',
            'content' : '11111111111111111111111'
        }
    ]

}

var fs = require('fs');

if(projectData.name){
    fs.mkdir(projectData.name);
    if(projectData.fileData && projectData.fileData.forEach){
        projectData.fileData.forEach(function (f) {
            f.path = projectData.name + '/' + f.name;
                switch (f.type){
                    case 'dir':
                        fs.mkdirSync(f.path);
                        break;
                    case 'file':
                        fs.writeFileSync(f.path, f.content);
                        break;
                    default :
                        break;
                }
        })
    }
}