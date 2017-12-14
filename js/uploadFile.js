/**
 * Created by skyee on 2017/12/7.
 */

function backUpload(input) {//上传

    var fileSize = 0;//文件大小
    _start=0;
    if (window.FileReader) {//支持chrome IE10
        _file1 = input.files[0];
        var filename = _file1.name.split(".")[0];
        _upFileSize=_file1.size;//文件字节数
        reading();
        // console.log(test)
    }
}



var READBLOCKSIZE = 511 ;

function reading()
{
    var reader = new FileReader();
    var contents = "";
    var arrayBuffer;var array=[];
    reader.readAsArrayBuffer(_file1);
        //读取结束的字节位置 < 文件的总字节数
        while((READBLOCKSIZE+_start)<_upFileSize){//需要进行多次循环
            var contents;
            contents= _file1.slice(_start,(READBLOCKSIZE+_start));
            reader.onload = function(e) {
                 arrayBuffer+= reader.result;
            }
            //下次循环
            _start=READBLOCKSIZE+_start;

        }
              array=new Uint8Array(arrayBuffer);
            console.log("array"+array);alert("上传成功!");

}
function getNum() {
    return [1,2,3,4];
}
