class UtilService {

  static getChain = (chain) => {
    switch (chain) {
      case '0x13881':
        return 'Mumbai';
      case '0x61':
        return 'Binance Smart Chain Testnet';
      case '0x4':
        return 'Rinkeby';
      case '0x3':
        return 'Ropsten';
      case '0x1':
      default:
        return 'eth';
    }
  }

  static getChain2 = (chain) => {
    switch (chain) {
      case '0x13881':
        return 'Polygon Mumbai network';
      case '0x61':
        return 'Binance Smart Chain network';
      case '0x4':
        return 'Rinkeby network';
      case '0x3':
        return 'Ropsten network';
      case '0x1':
      default:
        return 'Ethereum network';
    }
  }

  static getChain3 = (chain) => {
    switch (chain) {
      case '0x13881':
        return 'MATIC';
      case '0x61':
        return 'BSC';
      case '0x4':
      case '0x3':
      case '0x1':
      default:
        return 'ETH';
    }
  }

  static checkHexa = (num) => {
    return Boolean(num.match(/^0x[0-9a-f]+$/i))
  }

  static toHex = (bytes) => {
    return bytes.reduce(function (string, byte) {
      return string + ("00" + byte.toString(16)).substr(-2);
    }, '');
  }

  static CurrencyIcon(e) {
    if (e === '0x13881') return 'https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png'
    else if (e === '0x61') return 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency/128/Binance-Coin-icon.png'
    else return 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/480px-Ethereum-icon-purple.svg.png'
  }

  static FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }

  static truncate = (address) => {
    if (!address) {
      return '-'
    }
    return address?.substr(0, 6) + '...' + address?.substr(-4);
  }

  static ConvetImg(cImage) {
    return (cImage && cImage.substring(0, 4) === 'ipfs')
      ? 'https://minedn.io/ipfs/' + cImage.substring(7).replace('ipfs', '')
      : cImage
  }
}

export default UtilService;