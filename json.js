
var repeat = setInterval(ajax, 5000);
var st = '';
// 把字串存進 localStorage
var now_price = {};
var no = ["2330", "3346", "2328", "4916", "6579", "6414"];

for (let index = 0; index < no.length; index++) {
    now_price[no[index]] = '-';

}


// localStorage.setItem('price', now_price);
// ajax();


function ajax() {
    // console.log("hello");
    for (let index = 0; index < no.length; index++) {

        let ul = no[index];
        stock_data(ul);
    }

    // setTimeout(500);
    let con = document.getElementById("content").replaceChildren();
    $("#content").append(st);

    var update_price = JSON.stringify(now_price); // 變字串
    localStorage.setItem('new_price', update_price);


    // var getData = localStorage.getItem('new_price');
    // var getDataAry = JSON.parse(getData);
    // now_price = getDataAry
    // console.log(getDataAry);

    // for (let index = 0; index < no.length; index++) {

    //     let ul = no[index];
    //     document.getElementById(ul).innerHTML = "";
    // }

    st = '';
    // console.log(st);


};

function stock_data(ul) {


    fetch("http://tady900725.ddns.net:8080/api/" + ul).then(function (response) {
        return response.text();
    }).then(function (data) {
        let obj = JSON.parse(data);

        if (obj["msgArray"]["0"]["z"] != '-') {
            now_price[ul] = obj["msgArray"]["0"]["z"]
            console.log('ok');
        }

        // console.log(obj);
        // console.log(obj["msgArray"]["0"]["z"]);




        // <td class="column4" id ='+ ul + '>' + obj["msgArray"]["0"]["z"] + '</td> \
        st += '\
        <tr> \
        <td class="column1">'+ obj["msgArray"]["0"]["c"] + '</td> \
        <td class="column2">'+ obj["msgArray"]["0"]["n"] + '</td> \
        <td class="column3">'+ obj["msgArray"]["0"]["t"] + '</td> \
        <td class="column4">'+ now_price[ul] + '</td> \
        <td class="column5">'+ obj["msgArray"]["0"]["o"] + '</td> \
        <td class="column6">'+ obj["msgArray"]["0"]["h"] + '</td> \
        <td class="column7">'+ obj["msgArray"]["0"]["l"] + '</td> \
        <td class="column8">'+ obj["msgArray"]["0"]["w"] + '</td> \
        <td class="column9">'+ obj["msgArray"]["0"]["u"] + '</td> \
        <td class="column10">'+ obj["msgArray"]["0"]["tv"] + '</td> \
        <td class="column11">'+ obj["msgArray"]["0"]["v"] + '</td> \
        </tr> \
         '
        // console.log(st);

        //  tlong	epoch毫秒數
        //  f	揭示賣量(配合「a」，以_分隔資料)
        //  ex	上市別(上市:tse，上櫃:otc，空白:已下市或下櫃)
        //  g	揭示買量(配合「b」，以_分隔資料)
        //  d	最近交易日期(YYYYMMDD)
        //  b	揭示買價(從高到低，以_分隔資料)
        //  c	股票代號
        //  a	揭示賣價(從低到高，以_分隔資料)
        //  n	公司簡稱
        //  o	開盤
        //  l	最低
        //  h	最高
        //  w	跌停價
        //  v	累積成交量
        //  u	漲停價
        //  t	最近成交時刻(HH:MM:SS)
        //  tv	當盤成交量
        //  nf	公司全名
        //  z	當盤成交價
        //  y	昨收

        // var el = document.getElementById("head").innerHTML += '<th class="column1">Date</th>\
        // <th class="column2">Order ID</th>\
        // <th class="column3">Name</th>\
        // <th class="column4">Price</th>\
        // <th class="column5">Quantity</th>\
        // <th class="column6">Total</th>; ' ;


    })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })

};


// clearInterval(clock);