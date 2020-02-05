export interface Posts {
  filter: any;
  [x: string]: any;
  type: String;
  properties: {
    mag: Number;
    place: String;
    time: String;
    updated: String;
    tz: Number;
    url: String;
    detail: String;
    felt: Number;
    cdi: Number;
    mmi: Number;
    alert: String;
    status: String;
    tsunami: Number;
    sig: Number;
    net: String;
    code: String;
    ids: String;
    sources: String;
    types: String;
    nst: Number;
    dmin: Number;
    rms: Number;
    gap: Number;
    magType: String;
    type: String;
  };
}
