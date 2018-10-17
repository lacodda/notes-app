/* flow */

export interface SliceInterface {
  id: number;
  name: string;
  color: number;
  percent: any;
  activeTimeSum: number;
  activeTimeAvg: number;
  path: string;
  selected: boolean;
  isGroup: boolean;
  daysCount: number;
  rowNum: number;
}

export class Slice implements SliceInterface {
  id: number;

  name: string;

  color: number;

  percent: any;

  cumulativePercent: number;

  activeTimeSum: number;

  activeTimeAvg: number;

  path: string;

  selected: boolean;

  isGroup: boolean;

  daysCount: number;

  rowNum: number;

  donutRadius: number;

  cutoutRadius: number;

  percentageInnerCutout: number;

  constructor(settings) {
    this.id = (settings && settings.id) || 0;
    this.name = (settings && settings.name) || '';
    this.color = (settings && settings.color) || '';
    this.percent = (settings && settings.percent) || 0;
    this.cumulativePercent = (settings && settings.cumulativePercent) || 0;
    this.activeTimeSum = (settings && settings.activeTimeSum) || 0;
    this.activeTimeAvg = (settings && settings.activeTimeAvg) || 0;
    this.selected = settings && settings.selected ? settings.selected : false;
    this.isGroup = (settings && settings.isGroup) || false;
    this.daysCount = (settings && settings.daysCount) || 0;
    this.rowNum = (settings && settings.rowNum) || 0;
    this.percentageInnerCutout =
      (settings && settings.percentageInnerCutout) || 60;

    this.donutRadius = 1;
    this.cutoutRadius = this.donutRadius * (this.percentageInnerCutout / 100);
    this.path = this.buildSvgPath(this.percent, this.cumulativePercent);

    if (this.selected) {
      this.select();
    }
  }

  select() {
    this.selected = true;
    this.donutRadius = 1.05;
    this.path = this.buildSvgPath(this.percent, this.cumulativePercent);
  }

  unselect() {
    this.selected = false;
    this.donutRadius = 1;
    this.path = this.buildSvgPath(this.percent, this.cumulativePercent);
  }

  /**
   * Построит набор данных для отображения круговой диаграммы в svg формате
   *
   * @param percent
   * @returns {string}
   */
  buildSvgPath(percent, cumulativePercent = 0) {
    percent = percent > 100 ? 100 : percent;
    // destructuring assignment sets the two variables at once
    const [startX, startY] = this.getCoordinatesForPercent(
      cumulativePercent,
      this.donutRadius,
    );
    const [endX2, endY2] = this.getCoordinatesForPercent(
      cumulativePercent,
      this.cutoutRadius,
    );
    // each slice starts where the last slice ended, so keep a cumulative percent
    cumulativePercent += percent;

    const [endX, endY] = this.getCoordinatesForPercent(
      cumulativePercent,
      this.donutRadius,
    );
    const [startX2, startY2] = this.getCoordinatesForPercent(
      cumulativePercent,
      this.cutoutRadius,
    );

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = percent > 50 ? 1 : 0;
    // create an array and join it just for code readability
    return [
        'M', startX, startY, // Move pointer
        'A', this.donutRadius, this.donutRadius, 0, largeArcFlag, 1, endX, endY, // Draw outer arc path
        'L', startX2, startY2, // Draw line path(this line connects outer and innner arc paths)
        'A', this.cutoutRadius, this.cutoutRadius, 0, largeArcFlag, 0, endX2, endY2, // Draw inner arc path
        'Z' // Cloth path
    ].join(' ');
  }

  getCoordinatesForPercent = (percent, radius = 1, center = 0) => {
    percent = percent * 0.01;
    const x = center + Math.cos(2 * Math.PI * percent) * radius;
    const y = center + Math.sin(2 * Math.PI * percent) * radius;
    return [x, y];
  };
}

export default Slice;
