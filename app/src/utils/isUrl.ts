function isUrl(str?: string) {
  return !!str &&
    /^(((ftp|http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/i.test(
      str
    );
}

export default isUrl;
