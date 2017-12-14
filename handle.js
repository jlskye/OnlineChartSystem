/**
 * Created by skyee on 2017/12/10.
 */
//文件数据data绘制到图表
function setOption1(xData, transfer) {
    myChart.setOption({
        xAxis: {
            data: xData
        },
        series: [{
            name: '数值',
            data: transfer
        }],
    });
}

//数据操作通道处理
function setOption2(xData, transfer) {
    if(transfer.length===0){
        alert("请先上传文件");

    }else {
        document.getElementById('handled').style.visibility='visible';
        let doubles=transfer.map(x=>x**2);
        myChart2.setOption(setGradient());
        myChart2.setOption({
            title: {
                text: '求平方'
            },
            xAxis: {
                data: xData
            },
            series: [{
                name: '数值',
                data: doubles
            }],
        });
    }

    
}

//从二进制文件读入数据并保存在fileArray里面
function readFile(file){
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e){
        let arrayBuffer= reader.result ;

        var fileArray=[];
        fileArray=new Uint8Array(arrayBuffer);
        var transfer =[];
        for(var i=0;i<fileArray.length;i++){
            transfer.push(fileArray[i]*1);
        }
        var xData =[];
        for(var i=0;i<fileArray.length;i++){
            xData.push(i);
        }

        setOption1(xData, transfer);

        //动态实时显示文件数据
        let option3=getDynamicOption();
        setInterval(function() {
            let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
            let ydata = option3.series[0].data;
            ydata.shift();
            transfer.length>0?ydata.push(transfer.shift()):ydata.push(0);;

            option3.xAxis[0].data.shift();
            option3.xAxis[0].data.push(axisData);

            myChart3.setOption(option3);
        }, 1000);
        //通道二显示处理后的图像
        var handlebtn = document.getElementById('handlebtn');
        handlebtn.addEventListener('click', function() {
           setOption2(xData, transfer);
        }, false);
    };
}

//设置空的坐标轴
function getOrigin() {
    let option;
    return option=
    {
        title: {
            text: '原始数据'
        },
        tooltip: {},
        legend: {
            data:['数值']
        },
        xAxis: {
            data: [],
            name :'当前数量'
        },
        yAxis: {
            name :'整数值'
        },
        series: [{
            name: '数值',
            type: 'line',
            data: []
        }],
        dataZoom: [
            {
                type: 'slider',
                show: false,
                start: 94,
                end: 100,
                handleSize: 8
            },
            {
                type: 'inside',
                start: 94,
                end: 100
            },
            {
                type: 'slider',
                show: false,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 12,
                height: '70%',
                handleSize: 8,
                showDataShadow: false,
                left: '93%'
            }
        ],
        itemStyle: {
            normal: {
                color: '#5cb75c'
            }
        },
    };
}
//设置实时的数据通道
function getDynamicOption() {
    let option3={
        title: {
            text: 'Topic'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['当前整数值', '当前数量']
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: (function() {
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        }],
        yAxis: [ {
            type: 'value',
            scale: true,
            name: '当前数量',
            min: 0,
        }],
        series: [{
            name: '数量',
            type: 'line',
            smooth:true,
            itemStyle: {normal: {
                color:'#0099ff',
                lineStyle:{color:'#5cb75c'}
            }},
            data: (function() {
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push(null);
                    len++;
                }
                return res;
            })()
        }]
    };
    return option3;
}
