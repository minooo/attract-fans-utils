import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Icon,
  Switch,
  InputNumber,
  message,
  DatePicker,
  Cascader,
  Tag
} from "antd";
import { Nav } from "0-components";

// const options = [
//   {
//     value: "河南",
//     label: "河南",
//     id: 1,
//     children: [
//       {
//         value: "州长",
//         label: "州长",
//         id: 3,
//       }
//     ]
//   },
//   {
//     value: "罗马",
//     id: 1,
//     label: "罗马",
//     children: [
//       {
//         value: "比利时",
//         label: "比利时",
//       }
//     ]
//   }
// ];
const options=[
  {
      "id": "11",
      "value": "北京市",
      "children": [
          { "id": "110101", "value": "东城区" },
          { "id": "110102", "value": "西城区" },
          { "id": "110105", "value": "朝阳区" },
          { "id": "110106", "value": "丰台区" },
          { "id": "110107", "value": "石景山区" },
          { "id": "110108", "value": "海淀区" },
          { "id": "110109", "value": "门头沟区" },
          { "id": "110111", "value": "房山区" },
          { "id": "110112", "value": "通州区" },
          { "id": "110113", "value": "顺义区" },
          { "id": "110114", "value": "昌平区" },
          { "id": "110115", "value": "大兴区" },
          { "id": "110116", "value": "怀柔区" },
          { "id": "110117", "value": "平谷区" },
          { "id": "110118", "value": "密云区" },
          { "id": "110119", "value": "延庆区" }
      ]
  },
  {
      "id": "12",
      "value": "天津市",
      "children": [
          { "id": "120101", "value": "和平区" },
          { "id": "120102", "value": "河东区" },
          { "id": "120103", "value": "河西区" },
          { "id": "120104", "value": "南开区" },
          { "id": "120105", "value": "河北区" },
          { "id": "120106", "value": "红桥区" },
          { "id": "120110", "value": "东丽区" },
          { "id": "120111", "value": "西青区" },
          { "id": "120112", "value": "津南区" },
          { "id": "120113", "value": "北辰区" },
          { "id": "120114", "value": "武清区" },
          { "id": "120115", "value": "宝坻区" },
          { "id": "120116", "value": "滨海新区" },
          { "id": "120117", "value": "宁河区" },
          { "id": "120118", "value": "静海区" },
          { "id": "120119", "value": "蓟州区" }
      ]
  },
  {
      "id": "13",
      "value": "河北省",
      "children": [
          { "id": "1301", "value": "石家庄市" },
          { "id": "1302", "value": "唐山市" },
          { "id": "1303", "value": "秦皇岛市" },
          { "id": "1304", "value": "邯郸市" },
          { "id": "1305", "value": "邢台市" },
          { "id": "1306", "value": "保定市" },
          { "id": "1307", "value": "张家口市" },
          { "id": "1308", "value": "承德市" },
          { "id": "1309", "value": "沧州市" },
          { "id": "1310", "value": "廊坊市" },
          { "id": "1311", "value": "衡水市" }
      ]
  },
  {
      "id": "14",
      "value": "山西省",
      "children": [
          { "id": "1401", "value": "太原市" },
          { "id": "1402", "value": "大同市" },
          { "id": "1403", "value": "阳泉市" },
          { "id": "1404", "value": "长治市" },
          { "id": "1405", "value": "晋城市" },
          { "id": "1406", "value": "朔州市" },
          { "id": "1407", "value": "晋中市" },
          { "id": "1408", "value": "运城市" },
          { "id": "1409", "value": "忻州市" },
          { "id": "1410", "value": "临汾市" },
          { "id": "1411", "value": "吕梁市" }
      ]
  },
  {
      "id": "15",
      "value": "内蒙古自治区",
      "children": [
          { "id": "1501", "value": "呼和浩特市" },
          { "id": "1502", "value": "包头市" },
          { "id": "1503", "value": "乌海市" },
          { "id": "1504", "value": "赤峰市" },
          { "id": "1505", "value": "通辽市" },
          { "id": "1506", "value": "鄂尔多斯市" },
          { "id": "1507", "value": "呼伦贝尔市" },
          { "id": "1508", "value": "巴彦淖尔市" },
          { "id": "1509", "value": "乌兰察布市" },
          { "id": "1522", "value": "兴安盟" },
          { "id": "1525", "value": "锡林郭勒盟" },
          { "id": "1529", "value": "阿拉善盟" }
      ]
  },
  {
      "id": "21",
      "value": "辽宁省",
      "children": [
          { "id": "2101", "value": "沈阳市" },
          { "id": "2102", "value": "大连市" },
          { "id": "2103", "value": "鞍山市" },
          { "id": "2104", "value": "抚顺市" },
          { "id": "2105", "value": "本溪市" },
          { "id": "2106", "value": "丹东市" },
          { "id": "2107", "value": "锦州市" },
          { "id": "2108", "value": "营口市" },
          { "id": "2109", "value": "阜新市" },
          { "id": "2110", "value": "辽阳市" },
          { "id": "2111", "value": "盘锦市" },
          { "id": "2112", "value": "铁岭市" },
          { "id": "2113", "value": "朝阳市" },
          { "id": "2114", "value": "葫芦岛市" }
      ]
  },
  {
      "id": "22",
      "value": "吉林省",
      "children": [
          { "id": "2201", "value": "长春市" },
          { "id": "2202", "value": "吉林市" },
          { "id": "2203", "value": "四平市" },
          { "id": "2204", "value": "辽源市" },
          { "id": "2205", "value": "通化市" },
          { "id": "2206", "value": "白山市" },
          { "id": "2207", "value": "松原市" },
          { "id": "2208", "value": "白城市" },
          { "id": "2224", "value": "延边朝鲜族自治州" }
      ]
  },
  {
      "id": "23",
      "value": "黑龙江省",
      "children": [
          { "id": "2301", "value": "哈尔滨市" },
          { "id": "2302", "value": "齐齐哈尔市" },
          { "id": "2303", "value": "鸡西市" },
          { "id": "2304", "value": "鹤岗市" },
          { "id": "2305", "value": "双鸭山市" },
          { "id": "2306", "value": "大庆市" },
          { "id": "2307", "value": "伊春市" },
          { "id": "2308", "value": "佳木斯市" },
          { "id": "2309", "value": "七台河市" },
          { "id": "2310", "value": "牡丹江市" },
          { "id": "2311", "value": "黑河市" },
          { "id": "2312", "value": "绥化市" },
          { "id": "2327", "value": "大兴安岭地区" }
      ]
  },
  {
      "id": "31",
      "value": "上海市",
      "children": [
          { "id": "310101", "value": "黄浦区" },
          { "id": "310104", "value": "徐汇区" },
          { "id": "310105", "value": "长宁区" },
          { "id": "310106", "value": "静安区" },
          { "id": "310107", "value": "普陀区" },
          { "id": "310109", "value": "虹口区" },
          { "id": "310110", "value": "杨浦区" },
          { "id": "310112", "value": "闵行区" },
          { "id": "310113", "value": "宝山区" },
          { "id": "310114", "value": "嘉定区" },
          { "id": "310115", "value": "浦东新区" },
          { "id": "310116", "value": "金山区" },
          { "id": "310117", "value": "松江区" },
          { "id": "310118", "value": "青浦区" },
          { "id": "310120", "value": "奉贤区" },
          { "id": "310151", "value": "崇明区" }
      ]
  },
  {
      "id": "32",
      "value": "江苏省",
      "children": [
          { "id": "3201", "value": "南京市" },
          { "id": "3202", "value": "无锡市" },
          { "id": "3203", "value": "徐州市" },
          { "id": "3204", "value": "常州市" },
          { "id": "3205", "value": "苏州市" },
          { "id": "3206", "value": "南通市" },
          { "id": "3207", "value": "连云港市" },
          { "id": "3208", "value": "淮安市" },
          { "id": "3209", "value": "盐城市" },
          { "id": "3210", "value": "扬州市" },
          { "id": "3211", "value": "镇江市" },
          { "id": "3212", "value": "泰州市" },
          { "id": "3213", "value": "宿迁市" }
      ]
  },
  {
      "id": "33",
      "value": "浙江省",
      "children": [
          { "id": "3301", "value": "杭州市" },
          { "id": "3302", "value": "宁波市" },
          { "id": "3303", "value": "温州市" },
          { "id": "3304", "value": "嘉兴市" },
          { "id": "3305", "value": "湖州市" },
          { "id": "3306", "value": "绍兴市" },
          { "id": "3307", "value": "金华市" },
          { "id": "3308", "value": "衢州市" },
          { "id": "3309", "value": "舟山市" },
          { "id": "3310", "value": "台州市" },
          { "id": "3311", "value": "丽水市" }
      ]
  },
  {
      "id": "34",
      "value": "安徽省",
      "children": [
          { "id": "3401", "value": "合肥市" },
          { "id": "3402", "value": "芜湖市" },
          { "id": "3403", "value": "蚌埠市" },
          { "id": "3404", "value": "淮南市" },
          { "id": "3405", "value": "马鞍山市" },
          { "id": "3406", "value": "淮北市" },
          { "id": "3407", "value": "铜陵市" },
          { "id": "3408", "value": "安庆市" },
          { "id": "3410", "value": "黄山市" },
          { "id": "3411", "value": "滁州市" },
          { "id": "3412", "value": "阜阳市" },
          { "id": "3413", "value": "宿州市" },
          { "id": "3415", "value": "六安市" },
          { "id": "3416", "value": "亳州市" },
          { "id": "3417", "value": "池州市" },
          { "id": "3418", "value": "宣城市" }
      ]
  },
  {
      "id": "35",
      "value": "福建省",
      "children": [
          { "id": "3501", "value": "福州市" },
          { "id": "3502", "value": "厦门市" },
          { "id": "3503", "value": "莆田市" },
          { "id": "3504", "value": "三明市" },
          { "id": "3505", "value": "泉州市" },
          { "id": "3506", "value": "漳州市" },
          { "id": "3507", "value": "南平市" },
          { "id": "3508", "value": "龙岩市" },
          { "id": "3509", "value": "宁德市" }
      ]
  },
  {
      "id": "36",
      "value": "江西省",
      "children": [
          { "id": "3601", "value": "南昌市" },
          { "id": "3602", "value": "景德镇市" },
          { "id": "3603", "value": "萍乡市" },
          { "id": "3604", "value": "九江市" },
          { "id": "3605", "value": "新余市" },
          { "id": "3606", "value": "鹰潭市" },
          { "id": "3607", "value": "赣州市" },
          { "id": "3608", "value": "吉安市" },
          { "id": "3609", "value": "宜春市" },
          { "id": "3610", "value": "抚州市" },
          { "id": "3611", "value": "上饶市" }
      ]
  },
  {
      "id": "37",
      "value": "山东省",
      "children": [
          { "id": "3701", "value": "济南市" },
          { "id": "3702", "value": "青岛市" },
          { "id": "3703", "value": "淄博市" },
          { "id": "3704", "value": "枣庄市" },
          { "id": "3705", "value": "东营市" },
          { "id": "3706", "value": "烟台市" },
          { "id": "3707", "value": "潍坊市" },
          { "id": "3708", "value": "济宁市" },
          { "id": "3709", "value": "泰安市" },
          { "id": "3710", "value": "威海市" },
          { "id": "3711", "value": "日照市" },
          { "id": "3712", "value": "莱芜市" },
          { "id": "3713", "value": "临沂市" },
          { "id": "3714", "value": "德州市" },
          { "id": "3715", "value": "聊城市" },
          { "id": "3716", "value": "滨州市" },
          { "id": "3717", "value": "菏泽市" }
      ]
  },
  {
      "id": "41",
      "value": "河南省",
      "children": [
          { "id": "4101", "value": "郑州市" },
          { "id": "4102", "value": "开封市" },
          { "id": "4103", "value": "洛阳市" },
          { "id": "4104", "value": "平顶山市" },
          { "id": "4105", "value": "安阳市" },
          { "id": "4106", "value": "鹤壁市" },
          { "id": "4107", "value": "新乡市" },
          { "id": "4108", "value": "焦作市" },
          { "id": "4109", "value": "濮阳市" },
          { "id": "4110", "value": "许昌市" },
          { "id": "4111", "value": "漯河市" },
          { "id": "4112", "value": "三门峡市" },
          { "id": "4113", "value": "南阳市" },
          { "id": "4114", "value": "商丘市" },
          { "id": "4115", "value": "信阳市" },
          { "id": "4116", "value": "周口市" },
          { "id": "4117", "value": "驻马店市" },
          { "id": "419001", "value": "济源市" }
      ]
  },
  {
      "id": "42",
      "value": "湖北省",
      "children": [
          { "id": "4201", "value": "武汉市" },
          { "id": "4202", "value": "黄石市" },
          { "id": "4203", "value": "十堰市" },
          { "id": "4205", "value": "宜昌市" },
          { "id": "4206", "value": "襄阳市" },
          { "id": "4207", "value": "鄂州市" },
          { "id": "4208", "value": "荆门市" },
          { "id": "4209", "value": "孝感市" },
          { "id": "4210", "value": "荆州市" },
          { "id": "4211", "value": "黄冈市" },
          { "id": "4212", "value": "咸宁市" },
          { "id": "4213", "value": "随州市" },
          { "id": "4228", "value": "恩施土家族苗族自治州" },
          { "id": "429004", "value": "仙桃市" },
          { "id": "429005", "value": "潜江市" },
          { "id": "429006", "value": "天门市" },
          { "id": "429021", "value": "神农架林区" }
      ]
  },
  {
      "id": "43",
      "value": "湖南省",
      "children": [
          { "id": "4301", "value": "长沙市" },
          { "id": "4302", "value": "株洲市" },
          { "id": "4303", "value": "湘潭市" },
          { "id": "4304", "value": "衡阳市" },
          { "id": "4305", "value": "邵阳市" },
          { "id": "4306", "value": "岳阳市" },
          { "id": "4307", "value": "常德市" },
          { "id": "4308", "value": "张家界市" },
          { "id": "4309", "value": "益阳市" },
          { "id": "4310", "value": "郴州市" },
          { "id": "4311", "value": "永州市" },
          { "id": "4312", "value": "怀化市" },
          { "id": "4313", "value": "娄底市" },
          { "id": "4331", "value": "湘西土家族苗族自治州" }
      ]
  },
  {
      "id": "44",
      "value": "广东省",
      "children": [
          { "id": "4401", "value": "广州市" },
          { "id": "4402", "value": "韶关市" },
          { "id": "4403", "value": "深圳市" },
          { "id": "4404", "value": "珠海市" },
          { "id": "4405", "value": "汕头市" },
          { "id": "4406", "value": "佛山市" },
          { "id": "4407", "value": "江门市" },
          { "id": "4408", "value": "湛江市" },
          { "id": "4409", "value": "茂名市" },
          { "id": "4412", "value": "肇庆市" },
          { "id": "4413", "value": "惠州市" },
          { "id": "4414", "value": "梅州市" },
          { "id": "4415", "value": "汕尾市" },
          { "id": "4416", "value": "河源市" },
          { "id": "4417", "value": "阳江市" },
          { "id": "4418", "value": "清远市" },
          { "id": "4419", "value": "东莞市" },
          { "id": "4420", "value": "中山市" },
          { "id": "4451", "value": "潮州市" },
          { "id": "4452", "value": "揭阳市" },
          { "id": "4453", "value": "云浮市" }
      ]
  },
  {
      "id": "45",
      "value": "广西壮族自治区",
      "children": [
          { "id": "4501", "value": "南宁市" },
          { "id": "4502", "value": "柳州市" },
          { "id": "4503", "value": "桂林市" },
          { "id": "4504", "value": "梧州市" },
          { "id": "4505", "value": "北海市" },
          { "id": "4506", "value": "防城港市" },
          { "id": "4507", "value": "钦州市" },
          { "id": "4508", "value": "贵港市" },
          { "id": "4509", "value": "玉林市" },
          { "id": "4510", "value": "百色市" },
          { "id": "4511", "value": "贺州市" },
          { "id": "4512", "value": "河池市" },
          { "id": "4513", "value": "来宾市" },
          { "id": "4514", "value": "崇左市" }
      ]
  },
  {
      "id": "46",
      "value": "海南省",
      "children": [
          { "id": "4601", "value": "海口市" },
          { "id": "4602", "value": "三亚市" },
          { "id": "4603", "value": "三沙市" },
          { "id": "4604", "value": "儋州市" },
          { "id": "469001", "value": "五指山市" },
          { "id": "469002", "value": "琼海市" },
          { "id": "469005", "value": "文昌市" },
          { "id": "469006", "value": "万宁市" },
          { "id": "469007", "value": "东方市" },
          { "id": "469021", "value": "定安县" },
          { "id": "469022", "value": "屯昌县" },
          { "id": "469023", "value": "澄迈县" },
          { "id": "469024", "value": "临高县" },
          { "id": "469025", "value": "白沙黎族自治县" },
          { "id": "469026", "value": "昌江黎族自治县" },
          { "id": "469027", "value": "乐东黎族自治县" },
          { "id": "469028", "value": "陵水黎族自治县" },
          { "id": "469029", "value": "保亭黎族苗族自治县" },
          { "id": "469030", "value": "琼中黎族苗族自治县" }
      ]
  },
  {
      "id": "50",
      "value": "重庆市",
      "children": [
          { "id": "500101", "value": "万州区" },
          { "id": "500102", "value": "涪陵区" },
          { "id": "500103", "value": "渝中区" },
          { "id": "500104", "value": "大渡口区" },
          { "id": "500105", "value": "江北区" },
          { "id": "500106", "value": "沙坪坝区" },
          { "id": "500107", "value": "九龙坡区" },
          { "id": "500108", "value": "南岸区" },
          { "id": "500109", "value": "北碚区" },
          { "id": "500110", "value": "綦江区" },
          { "id": "500111", "value": "大足区" },
          { "id": "500112", "value": "渝北区" },
          { "id": "500113", "value": "巴南区" },
          { "id": "500114", "value": "黔江区" },
          { "id": "500115", "value": "长寿区" },
          { "id": "500116", "value": "江津区" },
          { "id": "500117", "value": "合川区" },
          { "id": "500118", "value": "永川区" },
          { "id": "500119", "value": "南川区" },
          { "id": "500120", "value": "璧山区" },
          { "id": "500151", "value": "铜梁区" },
          { "id": "500152", "value": "潼南区" },
          { "id": "500153", "value": "荣昌区" },
          { "id": "500154", "value": "开州区" },
          { "id": "500155", "value": "梁平区" },
          { "id": "500156", "value": "武隆区" },
          { "id": "500229", "value": "城口县" },
          { "id": "500230", "value": "丰都县" },
          { "id": "500231", "value": "垫江县" },
          { "id": "500233", "value": "忠县" },
          { "id": "500235", "value": "云阳县" },
          { "id": "500236", "value": "奉节县" },
          { "id": "500237", "value": "巫山县" },
          { "id": "500238", "value": "巫溪县" },
          { "id": "500240", "value": "石柱土家族自治县" },
          { "id": "500241", "value": "秀山土家族苗族自治县" },
          { "id": "500242", "value": "酉阳土家族苗族自治县" },
          { "id": "500243", "value": "彭水苗族土家族自治县" }
      ]
  },
  {
      "id": "51",
      "value": "四川省",
      "children": [
          { "id": "5101", "value": "成都市" },
          { "id": "5103", "value": "自贡市" },
          { "id": "5104", "value": "攀枝花市" },
          { "id": "5105", "value": "泸州市" },
          { "id": "5106", "value": "德阳市" },
          { "id": "5107", "value": "绵阳市" },
          { "id": "5108", "value": "广元市" },
          { "id": "5109", "value": "遂宁市" },
          { "id": "5110", "value": "内江市" },
          { "id": "5111", "value": "乐山市" },
          { "id": "5113", "value": "南充市" },
          { "id": "5114", "value": "眉山市" },
          { "id": "5115", "value": "宜宾市" },
          { "id": "5116", "value": "广安市" },
          { "id": "5117", "value": "达州市" },
          { "id": "5118", "value": "雅安市" },
          { "id": "5119", "value": "巴中市" },
          { "id": "5120", "value": "资阳市" },
          { "id": "5132", "value": "阿坝藏族羌族自治州" },
          { "id": "5133", "value": "甘孜藏族自治州" },
          { "id": "5134", "value": "凉山彝族自治州" }
      ]
  },
  {
      "id": "52",
      "value": "贵州省",
      "children": [
          { "id": "5201", "value": "贵阳市" },
          { "id": "5202", "value": "六盘水市" },
          { "id": "5203", "value": "遵义市" },
          { "id": "5204", "value": "安顺市" },
          { "id": "5205", "value": "毕节市" },
          { "id": "5206", "value": "铜仁市" },
          { "id": "5223", "value": "黔西南布依族苗族自治州" },
          { "id": "5226", "value": "黔东南苗族侗族自治州" },
          { "id": "5227", "value": "黔南布依族苗族自治州" }
      ]
  },
  {
      "id": "53",
      "value": "云南省",
      "children": [
          { "id": "5301", "value": "昆明市" },
          { "id": "5303", "value": "曲靖市" },
          { "id": "5304", "value": "玉溪市" },
          { "id": "5305", "value": "保山市" },
          { "id": "5306", "value": "昭通市" },
          { "id": "5307", "value": "丽江市" },
          { "id": "5308", "value": "普洱市" },
          { "id": "5309", "value": "临沧市" },
          { "id": "5323", "value": "楚雄彝族自治州" },
          { "id": "5325", "value": "红河哈尼族彝族自治州" },
          { "id": "5326", "value": "文山壮族苗族自治州" },
          { "id": "5328", "value": "西双版纳傣族自治州" },
          { "id": "5329", "value": "大理白族自治州" },
          { "id": "5331", "value": "德宏傣族景颇族自治州" },
          { "id": "5333", "value": "怒江傈僳族自治州" },
          { "id": "5334", "value": "迪庆藏族自治州" }
      ]
  },
  {
      "id": "54",
      "value": "西藏自治区",
      "children": [
          { "id": "5401", "value": "拉萨市" },
          { "id": "5402", "value": "日喀则市" },
          { "id": "5403", "value": "昌都市" },
          { "id": "5404", "value": "林芝市" },
          { "id": "5405", "value": "山南市" },
          { "id": "5424", "value": "那曲地区" },
          { "id": "5425", "value": "阿里地区" }
      ]
  },
  {
      "id": "61",
      "value": "陕西省",
      "children": [
          { "id": "6101", "value": "西安市" },
          { "id": "6102", "value": "铜川市" },
          { "id": "6103", "value": "宝鸡市" },
          { "id": "6104", "value": "咸阳市" },
          { "id": "6105", "value": "渭南市" },
          { "id": "6106", "value": "延安市" },
          { "id": "6107", "value": "汉中市" },
          { "id": "6108", "value": "榆林市" },
          { "id": "6109", "value": "安康市" },
          { "id": "6110", "value": "商洛市" }
      ]
  },
  {
      "id": "62",
      "value": "甘肃省",
      "children": [
          { "id": "6201", "value": "兰州市" },
          { "id": "6202", "value": "嘉峪关市" },
          { "id": "6203", "value": "金昌市" },
          { "id": "6204", "value": "白银市" },
          { "id": "6205", "value": "天水市" },
          { "id": "6206", "value": "武威市" },
          { "id": "6207", "value": "张掖市" },
          { "id": "6208", "value": "平凉市" },
          { "id": "6209", "value": "酒泉市" },
          { "id": "6210", "value": "庆阳市" },
          { "id": "6211", "value": "定西市" },
          { "id": "6212", "value": "陇南市" },
          { "id": "6229", "value": "临夏回族自治州" },
          { "id": "6230", "value": "甘南藏族自治州" }
      ]
  },
  {
      "id": "63",
      "value": "青海省",
      "children": [
          { "id": "6301", "value": "西宁市" },
          { "id": "6302", "value": "海东市" },
          { "id": "6322", "value": "海北藏族自治州" },
          { "id": "6323", "value": "黄南藏族自治州" },
          { "id": "6325", "value": "海南藏族自治州" },
          { "id": "6326", "value": "果洛藏族自治州" },
          { "id": "6327", "value": "玉树藏族自治州" },
          { "id": "6328", "value": "海西蒙古族藏族自治州" }
      ]
  },
  {
      "id": "64",
      "value": "宁夏回族自治区",
      "children": [
          { "id": "6401", "value": "银川市" },
          { "id": "6402", "value": "石嘴山市" },
          { "id": "6403", "value": "吴忠市" },
          { "id": "6404", "value": "固原市" },
          { "id": "6405", "value": "中卫市" }
      ]
  },
  {
      "id": "65",
      "value": "新疆维吾尔自治区",
      "children": [
          { "id": "6501", "value": "乌鲁木齐市" },
          { "id": "6502", "value": "克拉玛依市" },
          { "id": "6504", "value": "吐鲁番市" },
          { "id": "6505", "value": "哈密市" },
          { "id": "6523", "value": "昌吉回族自治州" },
          { "id": "6527", "value": "博尔塔拉蒙古自治州" },
          { "id": "6528", "value": "巴音郭楞蒙古自治州" },
          { "id": "6529", "value": "阿克苏地区" },
          { "id": "6530", "value": "克孜勒苏柯尔克孜自治州" },
          { "id": "6531", "value": "喀什地区" },
          { "id": "6532", "value": "和田地区" },
          { "id": "6540", "value": "伊犁哈萨克自治州" },
          { "id": "6542", "value": "塔城地区" },
          { "id": "6543", "value": "阿勒泰地区" },
          { "id": "659001", "value": "石河子市" },
          { "id": "659002", "value": "阿拉尔市" },
          { "id": "659003", "value": "图木舒克市" },
          { "id": "659004", "value": "五家渠市" },
          { "id": "659006", "value": "铁门关市" }
      ]
  }
]
const fomtdata = (data) =>{
  for(let i=0;i<data.length;i++){
    data[i].label=data[i].value
    for(let j=0;j<data[i].children.length;j++){
      data[i].children[j].label=data[i].children[j].value
    }
  }
  return data
}
const FormItem = Form.Item;

class BaseInfoSet extends Component {
  state = {
    siteName: [],
    province_id:[],
    city_id:[]
  };
  componentDidMount() {
  }
  onChange = (arr, value) => {
    // 0:{value: "河南", label: "河南", id: 1, children: Array(1)}
    // 1:{value: "州长", label: "州长", id: 3}
    // console.log(arr)
    console.log(value)
    const siteId=[value[0].id,value[1].id]
    console.log(siteId)
    const { siteName } = this.state;
    const newdata = arr.join(" ");
    if (!siteName.includes(newdata)) {
      this.setState((pre)=>({
        siteName: pre.siteName.concat(newdata)
      }))

    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { siteName } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        <Nav />
        <div className="mt30 plr25 border-default">
          <Form style={{ paddingTop: "40px" }} onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="活动开始时间">
              {getFieldDecorator("begin_time", {
                rules: [{ required: true, message: "请选择活动开始时间" }]
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="活动结束时间">
              {getFieldDecorator("end_time", {
                rules: [{ required: true, message: "请选择活动结束时间" }]
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <div className="flex basic-tack">
              <div className="ant-col-10 ant-form-item-label c333">
                <label className="ant-form-item-required">活动任务目标</label>
              </div>
              <div className=" equal">
                <FormItem {...formItemLayout}>
                  <span className="ant-input-group-addon">一阶邀请</span>
                  {getFieldDecorator("task1_num", {
                    rules: [
                      {
                        required: true,
                        message: "请填写一阶邀请任务人数"
                      }
                    ]
                  })(<InputNumber min={0} />)}
                  <span className="ant-input-group-addon">人关注领取奖励</span>
                </FormItem>
                <FormItem {...formItemLayout}>
                  <span className="ant-input-group-addon">二阶邀请</span>
                  {getFieldDecorator("task2_num", {
                    rules: [
                      {
                        required: true,
                        message: "请填写二阶邀请任务人数"
                      }
                    ]
                  })(<InputNumber min={0} />)}
                  <span className="ant-input-group-addon">人关注领取奖励</span>
                </FormItem>
                <FormItem {...formItemLayout} label="">
                  <span className="ant-input-group-addon">三阶邀请</span>
                  {getFieldDecorator("task3_num", {
                    rules: [
                      {
                        required: true,
                        message: "请填写三阶邀请任务人数"
                      }
                    ]
                  })(<InputNumber min={0} />)}
                  <span className="ant-input-group-addon">人关注领取奖励</span>
                </FormItem>
              </div>
            </div>
            <FormItem {...formItemLayout} label="活动开放地区">
              {getFieldDecorator("state")(
                <Cascader
                  style={{ maxWidth: "400px" }}
                  options={fomtdata(options)}
                  onChange={this.onChange}
                  placeholder="请选择开放地区"
                />
              )}
            </FormItem>
            <Button type="primary" className="ant-col-offset-10 mb20">
              添加地区
            </Button>
            <div className="ant-col-offset-10" style={{ maxWidth: "400px" }}>
              <div className="border-default flex wrap ptb20 plr20 r4 mb10">
                {siteName &&
                  siteName.length > 0 &&
                  siteName.map(item => (
                    <Tag style={{marginBottom:"20px"}} closable onClose={this.onClose}>
                      {item}
                    </Tag>
                  ))}
              </div>
              <div className="font12 c666 mb10">
                选择限制地区后，非该地区粉丝无法获取海报以及非该地区粉丝助力无效，选择地区点击添加，如需要删除点击对应地区即可
              </div>
            </div>
            <FormItem {...formItemLayout} label="活动奖品库存">
              {getFieldDecorator("task1_num", {
                rules: [
                  {
                    required: true,
                    message: "请填写一阶邀请任务人数"
                  }
                ]
              })(<InputNumber min={0} />)}
              <div className="c666 font12">
                库存设置为0，则表示不限制库存； 库存减少到0时，系统自动终止活动
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="取消扣除人气">
              {getFieldDecorator("is_auto")(<Switch />)}
              <div className="c666 font12">
                开启后，取关扣除人气值，重新扫码只算一次助力，能有效避免粉丝取消关注。
              </div>
            </FormItem>
            <FormItem wrapperCol={{ span: 14, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

BaseInfoSet = Form.create({})(BaseInfoSet);

export default BaseInfoSet;
