var cidrTosubnets = ["0.0.0.0", "128.0.0.0", "192.0.0.0", "224.0.0.0", "240.0.0.0", "248.0.0.0", "252.0.0.0", "254.0.0.0", "255.0.0.0", "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0", "255.255.0.0", "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0", "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252", "255.255.255.254", "255.255.255.255"]
var ipPattern = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}"
var PatternAddr = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}"
var PatternSubnet = "[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}"
var PatternCidr = /10|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|1|2|3|4|5|6|7|8|9/

turladdr=(document.URL).replace(/.*\/ipcalc\/(.*)\/.*/, '$1').replace(/#$/, '')
turlcidr=(document.URL).replace(/.*\/ipcalc\/.*\/(.*)/, '$1').replace(/#$/, '')
if (turladdr.match(PatternAddr) == turladdr && turlcidr.match(PatternCidr) == turlcidr)
  {
   tinSubnet = cidrTosubnets[(parseInt(turlcidr,10))]
   document.forms['input']['in_address'].value = turladdr
   document.forms['input']['in_subnet'].value = tinSubnet
   checkAndUpdate()
  }

//перевірка ip-адреси

function ipChange() {
  if (document.forms['input']['in_address'].value.indexOf('/') > -1)
    {
      var tcidr = (document.forms['input']['in_address'].value).substring(document.forms['input']['in_address'].value.indexOf('/') + 1)
      if (tcidr != '' && isFinite(tcidr) && tcidr >= 0 && tcidr <= 32)
        {
          document.forms['input']['in_subnet'].value = cidrTosubnets[(parseInt(tcidr,10))]
//          document.forms['output']['out_cidr'].value = tcidr
//          document.forms['output']['out_subnet'].value = cidrTosubnets[tcidr]
        }
    }
  checkAndUpdate()
}

function subChange()
{
  if (document.forms['input']['in_address'].value.indexOf('/') > -1)
    {
      var address = (document.forms['input']['in_address'].value).substring(0,document.forms['input']['in_address'].value.indexOf('/'))
//Find the CIDR of the subnetmask
      var i;
      for (i = 0; i < cidrTosubnets.length; i++)
      {
        if (document.forms['input']['in_subnet'].value == cidrTosubnets[i]){var tcidr = i}
      }
      if (tcidr != '' && isFinite(tcidr) && tcidr >= 0 && tcidr <= 32)
      {
        document.forms['input']['in_address'].value = address+"/"+tcidr
//      document.forms['output']['out_cidr'].value = tcidr
//      document.forms['output']['out_subnet'].value = cidrTosubnets[tcidr]
      }
    }
  checkAndUpdate()
}
function checkAndUpdate()
{
  if (checkValid())
  {
    UpdateOutput()
  }
  else
  {
    InvalidateOutput()
  }
}
function checkValid() {
//validate CIDR range
  if (document.forms['input']['in_address'].value.indexOf('/') > -1)
  {
    var tcidr = (document.forms['input']['in_address'].value).substring(document.forms['input']['in_address'].value.indexOf('/') + 1)
    if (tcidr == '' || isNaN(tcidr) || tcidr <= 0 || tcidr > 32
)
    {
      console.log('CIDR in input address is out of range')
      return false
    }
  }
//validate address
  if (document.forms['input']['in_address'].value.indexOf('/') > -1)
  {
    var taddress = (document.forms['input']['in_address'].value).substring(0,document.forms['input']['in_address'].value.indexOf('/'))
  }
  else
  {
    var taddress = document.forms['input']['in_address'].value
  }
 //format
  if (taddress.match(ipPattern) != taddress)
  {
    console.log('IP Address not formated x.x.x.x -> xxx.xxx.xxx.xxx')
    return false
  }
 //nothing over 255
  var tbytes = taddress.split(".")
    for (i = 0; i <= 3; i++)
    {
      if (tbytes[i]>=256)
      {
        console.log('IP address octect is larger than 255')
        return false
      }
    }
//перевірка на валідність маски
 //format
  if (document.forms['input']['in_subnet'].value.match(ipPattern) != document.forms['input']['in_subnet'].value)
  {
    console.log('Subnetmask not formated x.x.x.x -> xxx.xxx.xxx.xxx')
    return false
  }
 //bit ordering
  for (i = 0; i < cidrTosubnets.length; i++)
  {
    if (document.forms['input']['in_subnet'].value == cidrTosubnets[i]){var tcidr = i}
  }
  if (tcidr == '' || isNaN(tcidr))
  {
    console.log('Subnetmask improper ordering, not in order')
    return false
  }
  return true
}
function InvalidateOutput()
{
  document.forms['output']['out_address'].value = ''
  document.forms['output']['out_subnet'].value = ''
  document.forms['output']['out_cidr'].value = ''
  document.forms['output']['out_netaddr'].value = ''
  document.forms['output']['out_bcast'].value = ''
  document.forms['output']['out_firstusable'].value = ''
  document.forms['output']['out_lastusable'].value = ''
  document.forms['output']['out_amountaddresses'].value = ''
  document.forms['output']['out_ptraddr'].value = ''
  document.getElementById("is_valid").innerHTML = 'Перевірте правильність вводу інформації '
  document.getElementById("is_valid").style.backgroundColor = "#ffbb00"
  document.getElementById("is_valid").style.padding = "10px"
}

function UpdateOutput()
{
// Перевірка на валідність адреси
  document.getElementById("is_valid").innerHTML = 'Дані введені вірно'
  document.getElementById("is_valid").style.backgroundColor = "green"
// Locate Address
  if (document.forms['input']['in_address'].value.indexOf('/') > -1)
    {
      var taddress = (document.forms['input']['in_address'].value).substring(0,document.forms['input']['in_address'].value.indexOf('/'))
    }
  else
    {
      var taddress = document.forms['input']['in_address'].value
    }
//Do subnet calc
    for (i = 0; i < cidrTosubnets.length; i++)
    {
      if (document.forms['input']['in_subnet'].value == cidrTosubnets[i]){var tcidr = i}
    }
//Розрахунок меержі та широкомовної адреси
  var tabytes = taddress.split(".")
  var tsbytes = document.forms['input']['in_subnet'].value.split(".")
 //Network address
  var tnaddr = (tabytes[0] & tsbytes[0]) + "." + (tabytes[1] & tsbytes[1]) + "." + (tabytes[2] & tsbytes[2]) + "." + (tabytes[3] & tsbytes[3])
 //Broadcast address
  var tbaddr = ((tabytes[0] & tsbytes[0]) | (255 ^ tsbytes[0])) + "." + ((tabytes[1] & tsbytes[1]) | (255 ^ tsbytes[1])) + "." + ((tabytes[2] & tsbytes[2]) | (255 ^ tsbytes[2])) + "." + ((tabytes[3] & tsbytes[3]) | (255 ^ tsbytes[3]))
 //Reverse PTR
  var tptraddr = (tabytes[3] + '.' + tabytes[2] + '.' + tabytes[1] + '.' + tabytes[0] + '.in-addr.arpa')
if (tcidr == 32)
{
 //gw1 address
  var tgw1 = tnaddr
 //gw2 address
  var tgw2 = tnaddr
 // Count usable addresses
 tusable = 1
}
if (tcidr != 32)
{
 //gw1 address
  var tgw1 = (tabytes[0] & tsbytes[0]) + "." + (tabytes[1] & tsbytes[1]) + "." + (tabytes[2] & tsbytes[2]) + "." + ((tabytes[3] & tsbytes[3])+1)
 //gw2 address
  var tgw2 = ((tabytes[0] & tsbytes[0]) | (255 ^ tsbytes[0])) + "." + ((tabytes[1] & tsbytes[1]) | (255 ^ tsbytes[1])) + "." + ((tabytes[2] & tsbytes[2]) | (255 ^ tsbytes[2])) + "." + (((tabytes[3] & tsbytes[3]) | (255 ^ tsbytes[3]))-1)
 // Count usable addresses
 tusable = (Math.pow(2, (32-tcidr)))-2
}

//Do real outputing
  document.forms['output']['out_address'].value = taddress
  document.forms['output']['out_subnet'].value = document.forms['input']['in_subnet'].value
  document.forms['output']['out_cidr'].value = tcidr
  document.forms['output']['out_netaddr'].value = tnaddr
  document.forms['output']['out_bcast'].value = tbaddr
  document.forms['output']['out_firstusable'].value = tgw1
  document.forms['output']['out_lastusable'].value = tgw2
  document.forms['output']['out_amountaddresses'].value = tusable
  document.forms['output']['out_ptraddr'].value = tptraddr

  var stateObj = { foo: "bar" };
  history.pushState(stateObj, taddress + "/" + tcidr, "/ipcalc/"+taddress + "/" + tcidr);
}

function changeSection(Section)
{
  document.getElementById("static").className = 'hiddensection'
  document.getElementById("calc").className = 'hiddensection'
<!--  document.getElementById("IPv6Static").className = 'hiddensection'-->
  document.getElementById("calcSelector").className = 'sectionselector'
  document.getElementById("staticSelector").className = 'sectionselector'
<!--  document.getElementById("IPv6StaticSelector").className = 'sectionselector'-->

  if (Section=="calc")
  {
    document.getElementById("calc").className = 'section'
    document.getElementById("calcSelector").className = 'sectionselectoractive'
  }
  if (Section=="static")
  {
    document.getElementById("static").className = 'section'
    document.getElementById("staticSelector").className = 'sectionselectoractive'
  }
  if (Section=="IPv6Static")
  {
    document.getElementById("IPv6Static").className = 'hiddensection'
    document.getElementById("IPv6StaticSelector").className = 'sectionselector'
  }
}
