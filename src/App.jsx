import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);

const SHADOW_SIZE = 3;
const ARROW_LENGTH = 10;
const ARROW_ANGLE = Math.PI / 6;
const ARROW_X = ARROW_LENGTH * Math.sin(ARROW_ANGLE);
const ARROW_Y = ARROW_LENGTH * Math.cos(ARROW_ANGLE);

const nodes = [
  {
    text: 'Node 1',
    x: 350,
    y: 100,
    width: 100,
    height: 50,
  },
  {
    text: 'Node 2',
    x: 225,
    y: 300,
    width: 100,
    height: 50,
  },
  {
    text: 'Node 3',
    x: 475,
    y: 300,
    width: 100,
    height: 50,
  },
  {
    text: 'Node 4',
    x: 100,
    y: 500,
    width: 100,
    height: 50,
  },
  {
    text: 'Node 5',
    x: 350,
    y: 500,
    width: 100,
    height: 50,
  },
  {
    text: 'Node 6',
    x: 600,
    y: 500,
    width: 100,
    height: 50,
  },
];

// add an arrow that connects node1 to node2
const addArrow = (renderer, node1, node2, isDoubleEnded) => {
  const arrowStart = {
    x: node1.x + node1.width / 2 + SHADOW_SIZE,
    y: node1.y + node1.height + SHADOW_SIZE * 2,
  };

  const arrowEnd = {
    x: node2.x + node2.width / 2 + SHADOW_SIZE,
    y: node2.y - SHADOW_SIZE,
  };

  const initPath = isDoubleEnded
    ? // the beginning arrow if it is double ended
      [
        'M',
        arrowStart.x - ARROW_X,
        arrowStart.y + ARROW_Y,
        'L',
        arrowStart.x,
        arrowStart.y,
        'L',
        arrowStart.x + ARROW_X,
        arrowStart.y + ARROW_Y,
      ]
    : [];

  renderer
    .path([
      ...initPath,
      // arrow line
      'M',
      arrowStart.x,
      arrowStart.y,
      'C',
      arrowStart.x,
      (arrowStart.y + arrowEnd.y) / 2,
      arrowEnd.x,
      (arrowStart.y + arrowEnd.y) / 2,
      arrowEnd.x,
      arrowEnd.y,
      // the ending arrow
      'L',
      arrowEnd.x - ARROW_X,
      arrowEnd.y - ARROW_Y,
      'M',
      arrowEnd.x,
      arrowEnd.y,
      'L',
      arrowEnd.x + ARROW_X,
      arrowEnd.y - ARROW_Y,
    ])
    .attr({
      'stroke-width': 2,
      stroke: 'gray',
    })
    .add();
};

// add a label with specific text, position, dimension
const addLabel = (renderer, { text, x, y, width, height }) =>
  renderer
    .label(text, x, y)
    .css({
      fontWeight: 'bold',
      fontSize: '16px',
      color: 'yellow',
    })
    .attr({
      fill: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
            [0, 'red'],
            [1, 'blue']
        ]
      },
      r: 5, // border radius
      'text-align': 'center',
      width,
      height,
    })
    .add()
    .shadow(true);

const getOptions = () => ({
  chart: {
    type: 'line',
    width: 800,
    height: 600,
    events: {
      load: function () {
        const chart = this;
        const renderer = chart.renderer;

        // add all nodes
        nodes.map((node) => addLabel(renderer, node));

        // add arrows
        addArrow(renderer, nodes[0], nodes[1]);
        addArrow(renderer, nodes[0], nodes[2]);
        addArrow(renderer, nodes[1], nodes[3]);
        addArrow(renderer, nodes[1], nodes[4]);
        addArrow(renderer, nodes[2], nodes[4]);
        addArrow(renderer, nodes[2], nodes[5]);
      },
    },
  },
  title: {
    text: 'Node-Based Graph',
  },
  credits: {
    enabled: false,
  },
});

function App() {
  return (
    <div id="container">
      <HighchartsReact highcharts={Highcharts} options={getOptions()} />
    </div>
  );
}

export default App;
