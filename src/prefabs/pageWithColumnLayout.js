(() => ({
  name: 'Column layout configurator',
  icon: 'GridIcon',
  type: 'page',
  description:
    'Generate your layout, columns and rows by using the column layout component.',
  detail:
    'The Column layout generator component helps you shape the layout of your page beforehand by filling in how many columns and rows you would like to add to the page. After generating your layout, you can start dragging your desired components onto the canvas.',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Column_Layout.jpg',
  category: 'LAYOUT',
  beforeCreate: ({
    close,
    components: {
      Box,
      Content,
      Field,
      Footer,
      Header,
      ButtonGroup,
      ButtonGroupButton,
      Button,
      Text,
      DeleteButton,
    },
    prefab,
    save,
  }) => {
    const [rows, setRows] = React.useState([{ index: 1, columns: 2 }]);
    const createElements = (n) => {
      const elements = [];
      for (let i = 0; i < n; i += 1) {
        elements.push(
          <Box
            border={{
              color: '#AFB5C8',
              size: 'xsmall',
              style: 'dashed',
              side: 'all',
            }}
            margin="2px"
            direction="column"
            width={`${100 / n}%`}
            background="#f0f1f5"
          />,
        );
      }
      return elements;
    };

    const getDescendantByRef = (refValue, structure) =>
      structure.reduce((acc, component) => {
        if (acc) return acc;
        if (
          // eslint-disable-next-line no-prototype-builtins
          component.hasOwnProperty('ref') &&
          Object.values(component.ref).indexOf(refValue) > -1
        ) {
          return component;
        }
        return getDescendantByRef(refValue, component.descendants);
      }, null);

    const maxRows = rows.length < 9;

    return (
      <>
        <Header onClose={close} title="Configure Layout" />
        <Content>
          <>
            <Box direction="row">
              <Box direction="column" basis="2/3">
                <Field
                  info={
                    <Text size="small" color="grey700">
                      Click the <b>+ Add row</b> button to add a new row to the
                      page.
                      <br />
                      You can specify the amount of columns per row.
                    </Text>
                  }
                >
                  <Button
                    label="+ Add row"
                    disabled={!maxRows}
                    onClick={() => {
                      if (maxRows) {
                        setRows([
                          ...rows,
                          { index: rows.length + 1, columns: 1 },
                        ]);
                      }
                    }}
                  />
                </Field>
                {rows.map((row) => (
                  <Field key={row.index}>
                    <Box direction="row">
                      <Box
                        direction="column"
                        basis="auto"
                        alignSelf="center"
                        pad={{ right: '15px' }}
                      >
                        <Text>Row {row.index}</Text>
                      </Box>
                      <Box direction="column" basis="auto">
                        <ButtonGroup
                          onChange={({ target: { value } }) => {
                            const index = rows.findIndex(
                              (currentRow) => currentRow.index === row.index,
                            );
                            const updatedRows = rows;
                            updatedRows[index].columns = parseInt(value, 10);
                            setRows([...updatedRows]);
                          }}
                          value={row.columns.toString()}
                        >
                          <ButtonGroupButton
                            label="1"
                            value="1"
                            name={`options-${row.index}`}
                          />
                          <ButtonGroupButton
                            label="2"
                            value="2"
                            name={`options-${row.index}`}
                          />
                          <ButtonGroupButton
                            label="3"
                            value="3"
                            name={`options-${row.index}`}
                          />
                          <ButtonGroupButton
                            label="4"
                            value="4"
                            name={`options-${row.index}`}
                          />
                          <ButtonGroupButton
                            label="5"
                            value="5"
                            name={`options-${row.index}`}
                          />
                          <ButtonGroupButton
                            label="6"
                            value="6"
                            name={`options-${row.index}`}
                          />
                        </ButtonGroup>
                      </Box>
                      <Box
                        direction="column"
                        basis="auto"
                        pad={{ left: '5px' }}
                      >
                        <DeleteButton
                          label="X"
                          value={row.index}
                          disabled={!(rows.length > 1)}
                          onClick={(event) => {
                            const newRows = [...rows];
                            const index = newRows.findIndex(
                              (currentRow) =>
                                currentRow.index ===
                                parseInt(event.target.value, 10),
                            );
                            if (index !== -1) {
                              newRows.splice(index, 1);

                              newRows.map((correctRow, rowIndex) => {
                                const newRow = correctRow;
                                newRow.index = rowIndex + 1;
                                return { ...newRow };
                              });
                              setRows([...newRows]);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Field>
                ))}
              </Box>
              <Box direction="column" basis="1/3" margin={{ top: '11%' }}>
                <Text color="#666d85">Preview:</Text>
                {rows.map((row) => (
                  <Box
                    key={row.index}
                    border={{
                      color: '#AFB5C8',
                      size: 'xsmall',
                      style: 'dashed',
                      side: 'all',
                    }}
                    direction="row"
                    height="100%"
                    background="#FFFFFF"
                    justify="center"
                  >
                    {createElements(row.columns)}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box pad={{ top: '2rem' }}>
              <Text color="#666d85" size="small">
                Note: On smaller screens the preview may differ from what you
                see on the canvas.
                <br />
                It should be the same when you build the page.
              </Text>
            </Box>
          </>
        </Content>
        <Footer
          onClose={close}
          onSave={() => {
            const newPrefab = { ...prefab };
            rows.forEach((row) => {
              const newRow = {
                name: 'Row',
                options: [
                  {
                    type: 'CUSTOM',
                    label: 'Width',
                    key: 'maxRowWidth',
                    value: 'XL',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'S', value: 'S' },
                        { name: 'M', value: 'M' },
                        { name: 'L', value: 'L' },
                        { name: 'XL', value: 'XL' },
                        { name: 'Full', value: 'Full' },
                      ],
                    },
                  },
                  {
                    value: '',
                    label: 'Height',
                    key: 'rowHeight',
                    type: 'TEXT',
                    configuration: {
                      as: 'UNIT',
                    },
                  },
                  {
                    value: 'transparent',
                    label: 'Background color',
                    key: 'backgroundColor',
                    type: 'COLOR',
                  },
                  {
                    value: ['0rem', '0rem', '0rem', '0rem'],
                    label: 'Outer space',
                    key: 'outerSpacing',
                    type: 'SIZES',
                  },
                  {
                    value: false,
                    label: 'Advanced settings',
                    key: 'advancedSettings',
                    type: 'TOGGLE',
                  },
                  {
                    type: 'VARIABLE',
                    label: 'Test attribute',
                    key: 'dataComponentAttribute',
                    value: ['Row'],
                    configuration: {
                      condition: {
                        type: 'SHOW',
                        option: 'advancedSettings',
                        comparator: 'EQ',
                        value: true,
                      },
                    },
                  },
                ],
                descendants: [],
              };

              for (let index = 0; index < row.columns; index += 1) {
                let widthArray = [];
                switch (row.columns) {
                  case 2:
                    widthArray = ['6', '6', '12', '12'];
                    break;
                  case 3:
                    widthArray = ['4', '4', '12', '12'];
                    break;
                  case 4:
                    widthArray = ['3', '6', '6', '12'];
                    break;
                  case 5:
                    widthArray = ['flexible', 'flexible', '6', '12'];
                    break;
                  case 6:
                    widthArray = ['2', '2', '6', '6'];
                    break;
                  default:
                    widthArray = [
                      'flexible',
                      'flexible',
                      'flexible',
                      'flexible',
                    ];
                    break;
                }

                newRow.descendants.push({
                  name: 'Column',
                  options: [
                    {
                      label: 'Toggle visibility',
                      key: 'visible',
                      value: true,
                      type: 'TOGGLE',
                      configuration: {
                        as: 'VISIBILITY',
                      },
                    },
                    {
                      value: widthArray[0],
                      label: 'Column width',
                      key: 'columnWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    },
                    {
                      value: widthArray[1],
                      label: 'Column width (tablet landscape)',
                      key: 'columnWidthTabletLandscape',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    },
                    {
                      value: widthArray[2],
                      label: 'Column width (tablet portrait)',
                      key: 'columnWidthTabletPortrait',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    },
                    {
                      value: widthArray[3],
                      label: 'Column width (mobile)',
                      key: 'columnWidthMobile',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Fit content', value: 'fitContent' },
                          { name: 'Flexible', value: 'flexible' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                      },
                    },
                    {
                      value: '',
                      label: 'Height',
                      key: 'columnHeight',
                      type: 'TEXT',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      value: 'transparent',
                      label: 'Background color',
                      key: 'backgroundColor',
                      type: 'COLOR',
                    },
                    {
                      type: 'CUSTOM',
                      label: 'Horizontal Alignment',
                      key: 'horizontalAlignment',
                      value: 'inherit',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'None', value: 'inherit' },
                          { name: 'Left', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'Right', value: 'flex-end' },
                        ],
                      },
                    },
                    {
                      type: 'CUSTOM',
                      label: 'Vertical Alignment',
                      key: 'verticalAlignment',
                      value: 'inherit',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'None', value: 'inherit' },
                          { name: 'Top', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'Bottom', value: 'flex-end' },
                        ],
                      },
                    },
                    {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                      label: 'Outer space',
                      key: 'outerSpacing',
                      type: 'SIZES',
                    },
                    {
                      value: ['M', 'M', 'M', 'M'],
                      label: 'Inner space',
                      key: 'innerSpacing',
                      type: 'SIZES',
                    },
                    {
                      value: false,
                      label: 'Advanced settings',
                      key: 'advancedSettings',
                      type: 'TOGGLE',
                    },
                    {
                      type: 'VARIABLE',
                      label: 'Test attribute',
                      key: 'dataComponentAttribute',
                      value: ['Column'],
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'advancedSettings',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                  ],
                  descendants: [],
                });
              }
              const rootColumn = getDescendantByRef(
                '#rootColumn',
                newPrefab.structure,
              );
              rootColumn.descendants.push(newRow);
            });

            save(newPrefab);
          }}
        />
      </>
    );
  },
  interactions: [],
  structure: [
    {
      name: 'Row',
      options: [
        {
          type: 'CUSTOM',
          label: 'Width',
          key: 'maxRowWidth',
          value: 'Full',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'S', value: 'S' },
              { name: 'M', value: 'M' },
              { name: 'L', value: 'L' },
              { name: 'XL', value: 'XL' },
              { name: 'Full', value: 'Full' },
            ],
          },
        },
        {
          value: '100%',
          label: 'Height',
          key: 'rowHeight',
          type: 'TEXT',
          configuration: {
            as: 'UNIT',
          },
        },
        {
          value: 'transparent',
          label: 'Background color',
          key: 'backgroundColor',
          type: 'COLOR',
        },
        {
          value: ['0rem', '0rem', '0rem', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['Row'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [
        {
          name: 'Column',
          options: [
            {
              label: 'Toggle visibility',
              key: 'visible',
              value: true,
              type: 'TOGGLE',
              configuration: {
                as: 'VISIBILITY',
              },
            },
            {
              value: '12',
              label: 'Column width',
              key: 'columnWidth',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '12',
              label: 'Column width (tablet landscape)',
              key: 'columnWidthTabletLandscape',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '12',
              label: 'Column width (tablet portrait)',
              key: 'columnWidthTabletPortrait',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '12',
              label: 'Column width (mobile)',
              key: 'columnWidthMobile',
              type: 'CUSTOM',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: 'Fit content', value: 'fitContent' },
                  { name: 'Flexible', value: 'flexible' },
                  { name: 'Hidden', value: 'hidden' },
                  { name: '1', value: '1' },
                  { name: '2', value: '2' },
                  { name: '3', value: '3' },
                  { name: '4', value: '4' },
                  { name: '5', value: '5' },
                  { name: '6', value: '6' },
                  { name: '7', value: '7' },
                  { name: '8', value: '8' },
                  { name: '9', value: '9' },
                  { name: '10', value: '10' },
                  { name: '11', value: '11' },
                  { name: '12', value: '12' },
                ],
              },
            },
            {
              value: '',
              label: 'Height',
              key: 'columnHeight',
              type: 'TEXT',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              value: 'transparent',
              label: 'Background color',
              key: 'backgroundColor',
              type: 'COLOR',
            },
            {
              type: 'CUSTOM',
              label: 'Horizontal Alignment',
              key: 'horizontalAlignment',
              value: 'inherit',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'inherit' },
                  { name: 'Left', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Right', value: 'flex-end' },
                ],
              },
            },
            {
              type: 'CUSTOM',
              label: 'Vertical Alignment',
              key: 'verticalAlignment',
              value: 'inherit',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'None', value: 'inherit' },
                  { name: 'Top', value: 'flex-start' },
                  { name: 'Center', value: 'center' },
                  { name: 'Bottom', value: 'flex-end' },
                ],
              },
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Inner space',
              key: 'innerSpacing',
              type: 'SIZES',
            },
            {
              value: false,
              label: 'Advanced settings',
              key: 'advancedSettings',
              type: 'TOGGLE',
            },
            {
              type: 'VARIABLE',
              label: 'Test attribute',
              key: 'dataComponentAttribute',
              value: ['Column'],
              configuration: {
                condition: {
                  type: 'SHOW',
                  option: 'advancedSettings',
                  comparator: 'EQ',
                  value: true,
                },
              },
            },
          ],
          descendants: [
            {
              name: 'Grid',
              options: [
                {
                  value: true,
                  label: 'Toggle visibility',
                  key: 'visibility',
                  type: 'TOGGLE',
                  configuration: {
                    as: 'VISIBILITY',
                  },
                },
                {
                  value: '',
                  label: 'Model',
                  key: 'model',
                  type: 'MODEL',
                },
                {
                  value: {},
                  label: 'Filter',
                  key: 'filter',
                  type: 'FILTER',
                  configuration: {
                    dependsOn: 'model',
                  },
                },
                {
                  value: '5',
                  label: 'Repeated items (preview)',
                  key: 'repeatedItems',
                  type: 'NUMBER',
                  configuration: {
                    condition: {
                      type: 'HIDE',
                      option: 'model',
                      comparator: 'EQ',
                      value: '',
                    },
                  },
                },
                {
                  value: 'container',
                  label: 'Type',
                  key: 'type',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Container', value: 'container' },
                      { name: 'Item', value: 'item' },
                    ],
                  },
                },
                {
                  value: 'row',
                  label: 'Direction',
                  key: 'direction',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Horizontal', value: 'row' },
                      { name: 'Vertical', value: 'column' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: false,
                  label: 'Reverse',
                  key: 'reverse',
                  type: 'TOGGLE',
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: 'stretch',
                  label: 'Align items',
                  key: 'alignItems',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'flex-start' },
                      { name: 'Center', value: 'center' },
                      { name: 'End', value: 'flex-end' },
                      { name: 'Stretch', value: 'stretch' },
                      { name: 'Baseline', value: 'baseline' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: 'stretch',
                  label: 'Align content',
                  key: 'alignContent',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Stretch', value: 'stretch' },
                      { name: 'Center', value: 'center' },
                      { name: 'Start', value: 'flex-start' },
                      { name: 'End', value: 'flex-end' },
                      { name: 'Space around', value: 'space-around' },
                      { name: 'Space between', value: 'space-between' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  value: 'flex-start',
                  label: 'Justify',
                  key: 'justify',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Start', value: 'flex-start' },
                      { name: 'Center', value: 'center' },
                      { name: 'End', value: 'flex-end' },
                      { name: 'Space between', value: 'space-between' },
                      { name: 'Space around', value: 'space-around' },
                      { name: 'Space evenly', value: 'space-evenly' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'type',
                      comparator: 'EQ',
                      value: 'container',
                    },
                  },
                },
                {
                  type: 'SIZE',
                  label: 'Height',
                  key: 'height',
                  value: '100%',
                  configuration: {
                    as: 'UNIT',
                  },
                },
                {
                  value: 'Transparent',
                  label: 'Background color',
                  key: 'backgroundColor',
                  type: 'COLOR',
                },
                {
                  value: '0',
                  label: 'Spacing',
                  key: 'spacing',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: '0', value: '0' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                    ],
                  },
                },
                {
                  value: 'wrap',
                  label: 'Wrap',
                  key: 'wrap',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'No wrap', value: 'nowrap' },
                      { name: 'Wrap', value: 'wrap' },
                      { name: 'Wrap reverse', value: 'wrap-reverse' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Zero min width',
                  key: 'zeroMinWidth',
                  type: 'TOGGLE',
                },
                {
                  value: false,
                  label: 'Show responsive options',
                  key: 'responsiveOptions',
                  type: 'TOGGLE',
                },
                {
                  value: 'true',
                  label: 'XS width',
                  key: 'xsWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'SM width',
                  key: 'smWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'MD width',
                  key: 'mdWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'LG width',
                  key: 'lgWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'false',
                  label: 'XL width',
                  key: 'xlWidth',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Not set', value: 'false' },
                      { name: 'Flexible', value: 'true' },
                      { name: 'Fit content', value: 'auto' },
                      { name: 'Hidden', value: 'hidden' },
                      { name: '1', value: '1' },
                      { name: '2', value: '2' },
                      { name: '3', value: '3' },
                      { name: '4', value: '4' },
                      { name: '5', value: '5' },
                      { name: '6', value: '6' },
                      { name: '7', value: '7' },
                      { name: '8', value: '8' },
                      { name: '9', value: '9' },
                      { name: '10', value: '10' },
                      { name: '11', value: '11' },
                      { name: '12', value: '12' },
                    ],
                    condition: {
                      type: 'SHOW',
                      option: 'responsiveOptions',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
                {
                  value: 'built-in',
                  label: 'Error message',
                  key: 'showError',
                  type: 'CUSTOM',
                  configuration: {
                    as: 'BUTTONGROUP',
                    dataType: 'string',
                    allowedInput: [
                      { name: 'Built in', value: 'built-in' },
                      { name: 'Interaction', value: 'interaction' },
                    ],
                  },
                },
                {
                  value: false,
                  label: 'Advanced settings',
                  key: 'advancedSettings',
                  type: 'TOGGLE',
                },
                {
                  type: 'VARIABLE',
                  label: 'Test attribute',
                  key: 'dataComponentAttribute',
                  value: ['Grid'],
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'advancedSettings',
                      comparator: 'EQ',
                      value: true,
                    },
                  },
                },
              ],
              descendants: [
                {
                  name: 'Grid',
                  options: [
                    {
                      value: true,
                      label: 'Toggle visibility',
                      key: 'visibility',
                      type: 'TOGGLE',
                      configuration: {
                        as: 'VISIBILITY',
                      },
                    },
                    {
                      value: '',
                      label: 'Model',
                      key: 'model',
                      type: 'MODEL',
                    },
                    {
                      value: {},
                      label: 'Filter',
                      key: 'filter',
                      type: 'FILTER',
                      configuration: {
                        dependsOn: 'model',
                      },
                    },
                    {
                      value: '5',
                      label: 'Repeated items (preview)',
                      key: 'repeatedItems',
                      type: 'NUMBER',
                      configuration: {
                        condition: {
                          type: 'HIDE',
                          option: 'model',
                          comparator: 'EQ',
                          value: '',
                        },
                      },
                    },
                    {
                      value: 'container',
                      label: 'Type',
                      key: 'type',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Container', value: 'container' },
                          { name: 'Item', value: 'item' },
                        ],
                      },
                    },
                    {
                      value: 'column',
                      label: 'Direction',
                      key: 'direction',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Horizontal', value: 'row' },
                          { name: 'Vertical', value: 'column' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: false,
                      label: 'Reverse',
                      key: 'reverse',
                      type: 'TOGGLE',
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: 'stretch',
                      label: 'Align items',
                      key: 'alignItems',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Start', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'End', value: 'flex-end' },
                          { name: 'Stretch', value: 'stretch' },
                          { name: 'Baseline', value: 'baseline' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: 'stretch',
                      label: 'Align content',
                      key: 'alignContent',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Stretch', value: 'stretch' },
                          { name: 'Center', value: 'center' },
                          { name: 'Start', value: 'flex-start' },
                          { name: 'End', value: 'flex-end' },
                          { name: 'Space around', value: 'space-around' },
                          { name: 'Space between', value: 'space-between' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      value: 'flex-start',
                      label: 'Justify',
                      key: 'justify',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Start', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'End', value: 'flex-end' },
                          { name: 'Space between', value: 'space-between' },
                          { name: 'Space around', value: 'space-around' },
                          { name: 'Space evenly', value: 'space-evenly' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'type',
                          comparator: 'EQ',
                          value: 'container',
                        },
                      },
                    },
                    {
                      type: 'SIZE',
                      label: 'Height',
                      key: 'height',
                      value: '',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      value: 'Transparent',
                      label: 'Background color',
                      key: 'backgroundColor',
                      type: 'COLOR',
                    },
                    {
                      value: '0',
                      label: 'Spacing',
                      key: 'spacing',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: '0', value: '0' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                        ],
                      },
                    },
                    {
                      value: 'wrap',
                      label: 'Wrap',
                      key: 'wrap',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'No wrap', value: 'nowrap' },
                          { name: 'Wrap', value: 'wrap' },
                          { name: 'Wrap reverse', value: 'wrap-reverse' },
                        ],
                      },
                    },
                    {
                      value: false,
                      label: 'Zero min width',
                      key: 'zeroMinWidth',
                      type: 'TOGGLE',
                    },
                    {
                      value: false,
                      label: 'Show responsive options',
                      key: 'responsiveOptions',
                      type: 'TOGGLE',
                    },
                    {
                      value: 'true',
                      label: 'XS width',
                      key: 'xsWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'SM width',
                      key: 'smWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'MD width',
                      key: 'mdWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'LG width',
                      key: 'lgWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'false',
                      label: 'XL width',
                      key: 'xlWidth',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Not set', value: 'false' },
                          { name: 'Flexible', value: 'true' },
                          { name: 'Fit content', value: 'auto' },
                          { name: 'Hidden', value: 'hidden' },
                          { name: '1', value: '1' },
                          { name: '2', value: '2' },
                          { name: '3', value: '3' },
                          { name: '4', value: '4' },
                          { name: '5', value: '5' },
                          { name: '6', value: '6' },
                          { name: '7', value: '7' },
                          { name: '8', value: '8' },
                          { name: '9', value: '9' },
                          { name: '10', value: '10' },
                          { name: '11', value: '11' },
                          { name: '12', value: '12' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'responsiveOptions',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                    {
                      value: 'built-in',
                      label: 'Error message',
                      key: 'showError',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'Built in', value: 'built-in' },
                          { name: 'Interaction', value: 'interaction' },
                        ],
                      },
                    },
                    {
                      value: false,
                      label: 'Advanced settings',
                      key: 'advancedSettings',
                      type: 'TOGGLE',
                    },
                    {
                      type: 'VARIABLE',
                      label: 'Test attribute',
                      key: 'dataComponentAttribute',
                      value: ['Grid'],
                      configuration: {
                        condition: {
                          type: 'SHOW',
                          option: 'advancedSettings',
                          comparator: 'EQ',
                          value: true,
                        },
                      },
                    },
                  ],
                  descendants: [
                    {
                      name: 'Box',
                      options: [
                        {
                          value: 'none',
                          label: 'Alignment',
                          key: 'alignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Left', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Right', value: 'flex-end' },
                              { name: 'Justified', value: 'space-between' },
                            ],
                          },
                        },
                        {
                          value: 'none',
                          label: 'Vertical alignment',
                          key: 'valignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Top', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Bottom', value: 'flex-end' },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Stretch (when in flex container)',
                          key: 'stretch',
                          type: 'TOGGLE',
                        },
                        {
                          value: false,
                          label: 'Transparent',
                          key: 'transparent',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'SIZE',
                          label: 'Height',
                          key: 'height',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Width',
                          key: 'width',
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                          label: 'Outer space',
                          key: 'outerSpacing',
                          type: 'SIZES',
                        },
                        {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                          label: 'Inner space',
                          key: 'innerSpacing',
                          type: 'SIZES',
                        },
                        {
                          value: false,
                          label: 'Show positioning options',
                          key: 'positioningOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'static',
                          label: 'Position',
                          key: 'position',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Static', value: 'static' },
                              { name: 'Relative', value: 'relative' },
                              { name: 'Absolute', value: 'absolute' },
                              { name: 'Fixed', value: 'fixed' },
                              { name: 'Sticky', value: 'sticky' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Top position',
                          key: 'top',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Right position',
                          key: 'right',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Bottom position',
                          key: 'bottom',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Left position',
                          key: 'left',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: true,
                          label: 'Show background options',
                          key: 'backgroundOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'Primary',
                          label: 'Background color',
                          key: 'backgroundColor',
                          type: 'COLOR',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 100,
                          label: 'Background color opacity',
                          key: 'backgroundColorAlpha',
                          type: 'NUMBER',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: [''],
                          label: 'Background url',
                          key: 'backgroundUrl',
                          type: 'VARIABLE',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'initial',
                          label: 'Background size',
                          key: 'backgroundSize',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Initial', value: 'initial' },
                              { name: 'Contain', value: 'contain' },
                              { name: 'Cover', value: 'cover' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'center center',
                          label: 'Background position',
                          key: 'backgroundPosition',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Left top', value: 'left top' },
                              { name: 'Left center', value: 'left center' },
                              { name: 'Left bottom', value: 'left bottom' },
                              { name: 'Center top', value: 'center top' },
                              { name: 'Center center', value: 'center center' },
                              { name: 'Center bottom', value: 'center bottom' },
                              { name: 'Right top', value: 'right top' },
                              { name: 'Right center', value: 'right center' },
                              { name: 'Right bottom', value: 'right bottom' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'no-repeat',
                          label: 'Background repeat',
                          key: 'backgroundRepeat',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'no-repeat' },
                              { name: 'X', value: 'repeat-x' },
                              { name: 'Y', value: 'repeat-y' },
                              { name: 'All', value: 'repeat' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'Transparent',
                          label: 'Border color',
                          key: 'borderColor',
                          type: 'COLOR',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Border thickness',
                          key: 'borderWidth',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'solid',
                          label: 'Border style',
                          key: 'borderStyle',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Solid', value: 'solid' },
                              { name: 'Dashed', value: 'dashed' },
                              { name: 'Dotted', value: 'dotted' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Border radius',
                          key: 'borderRadius',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: false,
                          label: 'Advanced settings',
                          key: 'advancedSettings',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'VARIABLE',
                          label: 'Test attribute',
                          key: 'dataComponentAttribute',
                          value: ['Box'],
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'advancedSettings',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                      ],
                      descendants: [
                        {
                          name: 'Row',
                          options: [
                            {
                              type: 'CUSTOM',
                              label: 'Width',
                              key: 'maxRowWidth',
                              value: 'XL',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'S', value: 'S' },
                                  { name: 'M', value: 'M' },
                                  { name: 'L', value: 'L' },
                                  { name: 'XL', value: 'XL' },
                                  { name: 'Full', value: 'Full' },
                                ],
                              },
                            },
                            {
                              value: '',
                              label: 'Height',
                              key: 'rowHeight',
                              type: 'TEXT',
                              configuration: {
                                as: 'UNIT',
                              },
                            },
                            {
                              value: 'transparent',
                              label: 'Background color',
                              key: 'backgroundColor',
                              type: 'COLOR',
                            },
                            {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                              label: 'Outer space',
                              key: 'outerSpacing',
                              type: 'SIZES',
                            },
                            {
                              value: false,
                              label: 'Advanced settings',
                              key: 'advancedSettings',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'VARIABLE',
                              label: 'Test attribute',
                              key: 'dataComponentAttribute',
                              value: ['Row'],
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'advancedSettings',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
                            },
                          ],
                          descendants: [
                            {
                              name: 'Column',
                              options: [
                                {
                                  label: 'Toggle visibility',
                                  key: 'visible',
                                  value: true,
                                  type: 'TOGGLE',
                                  configuration: {
                                    as: 'VISIBILITY',
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width',
                                  key: 'columnWidth',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width (tablet landscape)',
                                  key: 'columnWidthTabletLandscape',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width (tablet portrait)',
                                  key: 'columnWidthTabletPortrait',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: 'flexible',
                                  label: 'Column width (mobile)',
                                  key: 'columnWidthMobile',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: '',
                                  label: 'Height',
                                  key: 'columnHeight',
                                  type: 'TEXT',
                                  configuration: {
                                    as: 'UNIT',
                                  },
                                },
                                {
                                  value: 'transparent',
                                  label: 'Background color',
                                  key: 'backgroundColor',
                                  type: 'COLOR',
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Horizontal Alignment',
                                  key: 'horizontalAlignment',
                                  value: 'inherit',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Vertical Alignment',
                                  key: 'verticalAlignment',
                                  value: 'inherit',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Top', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Bottom', value: 'flex-end' },
                                    ],
                                  },
                                },
                                {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                  label: 'Outer space',
                                  key: 'outerSpacing',
                                  type: 'SIZES',
                                },
                                {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                  label: 'Inner space',
                                  key: 'innerSpacing',
                                  type: 'SIZES',
                                },
                                {
                                  value: false,
                                  label: 'Advanced settings',
                                  key: 'advancedSettings',
                                  type: 'TOGGLE',
                                },
                                {
                                  type: 'VARIABLE',
                                  label: 'Test attribute',
                                  key: 'dataComponentAttribute',
                                  value: ['Column'],
                                  configuration: {
                                    condition: {
                                      type: 'SHOW',
                                      option: 'advancedSettings',
                                      comparator: 'EQ',
                                      value: true,
                                    },
                                  },
                                },
                              ],
                              descendants: [
                                {
                                  name: 'AppBar',
                                  options: [
                                    {
                                      label: 'Background color',
                                      key: 'backgroundColor',
                                      value: 'Primary',
                                      type: 'COLOR',
                                    },
                                    {
                                      label: 'Text color',
                                      key: 'color',
                                      value: 'White',
                                      type: 'COLOR',
                                    },
                                    {
                                      type: 'SIZE',
                                      label: 'Height',
                                      key: 'height',
                                      value: '',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    },
                                    {
                                      label: 'Position',
                                      key: 'position',
                                      value: 'static',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          {
                                            name: 'Fixed',
                                            value: 'fixed',
                                          },
                                          {
                                            name: 'Absolute',
                                            value: 'absolute',
                                          },
                                          {
                                            name: 'Sticky',
                                            value: 'sticky',
                                          },
                                          {
                                            name: 'Static',
                                            value: 'static',
                                          },
                                          {
                                            name: 'Relative',
                                            value: 'relative',
                                          },
                                        ],
                                      },
                                    },
                                    {
                                      label: 'Title',
                                      key: 'title',
                                      value: [''],
                                      type: 'VARIABLE',
                                    },
                                    {
                                      label: 'Logo',
                                      key: 'logoSource',
                                      value: [
                                        'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                      ],
                                      type: 'VARIABLE',
                                    },
                                    {
                                      type: 'SIZE',
                                      label: 'Logo Width',
                                      key: 'logoWidth',
                                      value: '150px',
                                      configuration: {
                                        as: 'UNIT',
                                      },
                                    },
                                    {
                                      label: 'Align items',
                                      key: 'alignItems',
                                      value: 'right',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          {
                                            name: 'Left',
                                            value: 'left',
                                          },
                                          {
                                            name: 'Right',
                                            value: 'right',
                                          },
                                        ],
                                      },
                                    },
                                    {
                                      label: 'Page',
                                      key: 'endpoint',
                                      value: '',
                                      type: 'ENDPOINT',
                                    },
                                    {
                                      label: 'Variant',
                                      key: 'appBarVariant',
                                      value: 'flat',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'BUTTONGROUP',
                                        dataType: 'string',
                                        allowedInput: [
                                          {
                                            name: 'Flat',
                                            value: 'flat',
                                          },
                                          {
                                            name: 'Elevation',
                                            value: 'elevation',
                                          },
                                          {
                                            name: 'Outlined',
                                            value: 'outlined',
                                          },
                                        ],
                                      },
                                    },
                                    {
                                      label: 'Elevation',
                                      key: 'elevation',
                                      value: '1',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          { name: '1', value: '1' },
                                          { name: '2', value: '2' },
                                          { name: '3', value: '3' },
                                          { name: '4', value: '4' },
                                          { name: '5', value: '5' },
                                          { name: '6', value: '6' },
                                          { name: '7', value: '7' },
                                          { name: '8', value: '8' },
                                          { name: '9', value: '9' },
                                          { name: '10', value: '10' },
                                          { name: '11', value: '11' },
                                          { name: '12', value: '12' },
                                          { name: '13', value: '13' },
                                          { name: '14', value: '14' },
                                          { name: '15', value: '15' },
                                          { name: '16', value: '16' },
                                          { name: '17', value: '17' },
                                          { name: '18', value: '18' },
                                          { name: '19', value: '19' },
                                          { name: '20', value: '20' },
                                          { name: '21', value: '21' },
                                          { name: '22', value: '22' },
                                          { name: '23', value: '23' },
                                          { name: '24', value: '24' },
                                        ],
                                        condition: {
                                          type: 'SHOW',
                                          option: 'appBarVariant',
                                          comparator: 'EQ',
                                          value: 'elevation',
                                        },
                                      },
                                    },
                                    {
                                      label: 'Square',
                                      key: 'square',
                                      value: true,
                                      type: 'TOGGLE',
                                    },
                                    {
                                      label: 'Size',
                                      key: 'toolbarVariant',
                                      value: 'regular',
                                      type: 'CUSTOM',
                                      configuration: {
                                        as: 'DROPDOWN',
                                        dataType: 'string',
                                        allowedInput: [
                                          {
                                            name: 'Regular',
                                            value: 'regular',
                                          },
                                          {
                                            name: 'Dense',
                                            value: 'dense',
                                          },
                                        ],
                                      },
                                    },
                                    {
                                      value: false,
                                      label: 'Advanced settings',
                                      key: 'advancedSettings',
                                      type: 'TOGGLE',
                                    },
                                    {
                                      type: 'VARIABLE',
                                      label: 'Test attribute',
                                      key: 'dataComponentAttribute',
                                      value: ['AppBar'],
                                      configuration: {
                                        condition: {
                                          type: 'SHOW',
                                          option: 'advancedSettings',
                                          comparator: 'EQ',
                                          value: true,
                                        },
                                      },
                                    },
                                  ],
                                  descendants: [
                                    {
                                      name: 'Button',
                                      style: {
                                        overwrite: {
                                          backgroundColor: {
                                            type: 'STATIC',
                                            value: 'transparent',
                                          },
                                          boxShadow: 'none',
                                          color: {
                                            type: 'THEME_COLOR',
                                            value: 'white',
                                          },
                                          fontFamily: 'Roboto',
                                          fontSize: '0.875rem',
                                          fontStyle: 'none',
                                          fontWeight: '400',
                                          padding: ['0rem', '0rem'],
                                          textDecoration: 'none',
                                          textTransform: 'none',
                                        },
                                      },
                                      options: [
                                        {
                                          label: 'Toggle visibility',
                                          key: 'visible',
                                          value: true,
                                          type: 'TOGGLE',
                                          configuration: {
                                            as: 'VISIBILITY',
                                          },
                                        },
                                        {
                                          type: 'CUSTOM',
                                          label: 'variant',
                                          key: 'variant',
                                          value: 'text',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: 'Text', value: 'text' },
                                              {
                                                name: 'Outlined',
                                                value: 'outlined',
                                              },
                                              {
                                                name: 'Contain',
                                                value: 'contained',
                                              },
                                              { name: 'Icon', value: 'icon' },
                                            ],
                                          },
                                        },
                                        {
                                          type: 'VARIABLE',
                                          label: 'Button text',
                                          key: 'buttonText',
                                          value: ['Menu 1'],
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                          },
                                        },
                                        {
                                          type: 'CUSTOM',
                                          label: 'Link to',
                                          key: 'linkType',
                                          value: 'internal',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Internal page',
                                                value: 'internal',
                                              },
                                              {
                                                name: 'External page',
                                                value: 'external',
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          value: '',
                                          label: 'Page',
                                          key: 'linkTo',
                                          type: 'ENDPOINT',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'linkType',
                                              comparator: 'EQ',
                                              value: 'internal',
                                            },
                                          },
                                        },
                                        {
                                          value: [''],
                                          label: 'URL',
                                          key: 'linkToExternal',
                                          type: 'VARIABLE',
                                          configuration: {
                                            placeholder:
                                              'Starts with https:// or http://',
                                            condition: {
                                              type: 'SHOW',
                                              option: 'linkType',
                                              comparator: 'EQ',
                                              value: 'external',
                                            },
                                          },
                                        },
                                        {
                                          value: '_self',
                                          label: 'Open in',
                                          key: 'openLinkToExternal',
                                          type: 'CUSTOM',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'linkType',
                                              comparator: 'EQ',
                                              value: 'external',
                                            },
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Current Tab',
                                                value: '_self',
                                              },
                                              {
                                                name: 'New Tab',
                                                value: '_blank',
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          value: false,
                                          label: 'Full width',
                                          key: 'fullWidth',
                                          type: 'TOGGLE',
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                          },
                                        },
                                        {
                                          value: 'medium',
                                          label: 'Size',
                                          key: 'size',
                                          type: 'CUSTOM',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: 'Large', value: 'large' },
                                              {
                                                name: 'Medium',
                                                value: 'medium',
                                              },
                                              { name: 'Small', value: 'small' },
                                            ],
                                          },
                                        },
                                        {
                                          label: 'Icon',
                                          key: 'icon',
                                          value: 'None',
                                          type: 'ICON',
                                        },
                                        {
                                          type: 'CUSTOM',
                                          label: 'Icon position',
                                          key: 'iconPosition',
                                          value: 'start',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                            allowedInput: [
                                              { name: 'Start', value: 'start' },
                                              { name: 'End', value: 'end' },
                                            ],
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Text color',
                                          key: 'textColor',
                                          value: 'White',
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Color',
                                          key: 'background',
                                          value: 'Primary',
                                        },
                                        {
                                          value: ['0rem', 'M', '0rem', 'M'],
                                          label: 'Outer space',
                                          key: 'outerSpacing',
                                          type: 'SIZES',
                                        },
                                        {
                                          label: 'Disabled',
                                          key: 'disabled',
                                          value: false,
                                          type: 'TOGGLE',
                                        },
                                        {
                                          label: 'Add Tooltip',
                                          key: 'addTooltip',
                                          value: false,
                                          type: 'TOGGLE',
                                        },
                                        {
                                          label: 'Toggle tooltip visibility',
                                          key: 'hasVisibleTooltip',
                                          value: true,
                                          type: 'TOGGLE',
                                          configuration: {
                                            as: 'VISIBILITY',
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          type: 'VARIABLE',
                                          label: 'Tooltip Content',
                                          key: 'tooltipContent',
                                          value: ['Tips'],
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          label: 'Tooltip Placement',
                                          key: 'tooltipPlacement',
                                          value: 'bottom',
                                          type: 'CUSTOM',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Top Start',
                                                value: 'top-start',
                                              },
                                              {
                                                name: 'Top',
                                                value: 'top',
                                              },
                                              {
                                                name: 'Top End',
                                                value: 'top-end',
                                              },
                                              {
                                                name: 'Right',
                                                value: 'right',
                                              },
                                              {
                                                name: 'Left',
                                                value: 'left',
                                              },
                                              {
                                                name: 'Botttom Start',
                                                value: 'bottom-start',
                                              },
                                              {
                                                name: 'Bottom',
                                                value: 'bottom',
                                              },
                                              {
                                                name: 'Bottom End',
                                                value: 'bottom-end',
                                              },
                                            ],
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Tooltip Background',
                                          key: 'tooltipBackground',
                                          value: 'Medium',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Tooltip Text',
                                          key: 'tooltipText',
                                          value: 'Black',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          value: false,
                                          label: 'Advanced settings',
                                          key: 'advancedSettings',
                                          type: 'TOGGLE',
                                        },
                                        {
                                          type: 'VARIABLE',
                                          label: 'Test attribute',
                                          key: 'dataComponentAttribute',
                                          value: ['Button'],
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'advancedSettings',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                      ],
                                      descendants: [],
                                    },
                                    {
                                      name: 'Button',
                                      style: {
                                        overwrite: {
                                          backgroundColor: {
                                            type: 'STATIC',
                                            value: 'transparent',
                                          },
                                          boxShadow: 'none',
                                          color: {
                                            type: 'THEME_COLOR',
                                            value: 'white',
                                          },
                                          fontFamily: 'Roboto',
                                          fontSize: '0.875rem',
                                          fontStyle: 'none',
                                          fontWeight: '400',
                                          padding: ['0rem', '0rem'],
                                          textDecoration: 'none',
                                          textTransform: 'none',
                                        },
                                      },
                                      options: [
                                        {
                                          label: 'Toggle visibility',
                                          key: 'visible',
                                          value: true,
                                          type: 'TOGGLE',
                                          configuration: {
                                            as: 'VISIBILITY',
                                          },
                                        },
                                        {
                                          type: 'CUSTOM',
                                          label: 'variant',
                                          key: 'variant',
                                          value: 'text',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: 'Text', value: 'text' },
                                              {
                                                name: 'Outlined',
                                                value: 'outlined',
                                              },
                                              {
                                                name: 'Contain',
                                                value: 'contained',
                                              },
                                              { name: 'Icon', value: 'icon' },
                                            ],
                                          },
                                        },
                                        {
                                          type: 'VARIABLE',
                                          label: 'Button text',
                                          key: 'buttonText',
                                          value: ['Menu 2'],
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                          },
                                        },
                                        {
                                          type: 'CUSTOM',
                                          label: 'Link to',
                                          key: 'linkType',
                                          value: 'internal',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Internal page',
                                                value: 'internal',
                                              },
                                              {
                                                name: 'External page',
                                                value: 'external',
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          value: '',
                                          label: 'Page',
                                          key: 'linkTo',
                                          type: 'ENDPOINT',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'linkType',
                                              comparator: 'EQ',
                                              value: 'internal',
                                            },
                                          },
                                        },
                                        {
                                          value: [''],
                                          label: 'URL',
                                          key: 'linkToExternal',
                                          type: 'VARIABLE',
                                          configuration: {
                                            placeholder:
                                              'Starts with https:// or http://',
                                            condition: {
                                              type: 'SHOW',
                                              option: 'linkType',
                                              comparator: 'EQ',
                                              value: 'external',
                                            },
                                          },
                                        },
                                        {
                                          value: '_self',
                                          label: 'Open in',
                                          key: 'openLinkToExternal',
                                          type: 'CUSTOM',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'linkType',
                                              comparator: 'EQ',
                                              value: 'external',
                                            },
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Current Tab',
                                                value: '_self',
                                              },
                                              {
                                                name: 'New Tab',
                                                value: '_blank',
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          value: false,
                                          label: 'Full width',
                                          key: 'fullWidth',
                                          type: 'TOGGLE',
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                          },
                                        },
                                        {
                                          value: 'medium',
                                          label: 'Size',
                                          key: 'size',
                                          type: 'CUSTOM',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            allowedInput: [
                                              { name: 'Large', value: 'large' },
                                              {
                                                name: 'Medium',
                                                value: 'medium',
                                              },
                                              { name: 'Small', value: 'small' },
                                            ],
                                          },
                                        },
                                        {
                                          label: 'Icon',
                                          key: 'icon',
                                          value: 'None',
                                          type: 'ICON',
                                        },
                                        {
                                          type: 'CUSTOM',
                                          label: 'Icon position',
                                          key: 'iconPosition',
                                          value: 'start',
                                          configuration: {
                                            as: 'BUTTONGROUP',
                                            dataType: 'string',
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                            allowedInput: [
                                              { name: 'Start', value: 'start' },
                                              { name: 'End', value: 'end' },
                                            ],
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Text color',
                                          key: 'textColor',
                                          value: 'White',
                                          configuration: {
                                            condition: {
                                              type: 'HIDE',
                                              option: 'variant',
                                              comparator: 'EQ',
                                              value: 'icon',
                                            },
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Color',
                                          key: 'background',
                                          value: 'Primary',
                                        },
                                        {
                                          value: ['0rem', '0rem', '0rem', 'M'],
                                          label: 'Outer space',
                                          key: 'outerSpacing',
                                          type: 'SIZES',
                                        },
                                        {
                                          label: 'Disabled',
                                          key: 'disabled',
                                          value: false,
                                          type: 'TOGGLE',
                                        },
                                        {
                                          label: 'Add Tooltip',
                                          key: 'addTooltip',
                                          value: false,
                                          type: 'TOGGLE',
                                        },
                                        {
                                          label: 'Toggle tooltip visibility',
                                          key: 'hasVisibleTooltip',
                                          value: true,
                                          type: 'TOGGLE',
                                          configuration: {
                                            as: 'VISIBILITY',
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          type: 'VARIABLE',
                                          label: 'Tooltip Content',
                                          key: 'tooltipContent',
                                          value: ['Tips'],
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          label: 'Tooltip Placement',
                                          key: 'tooltipPlacement',
                                          value: 'bottom',
                                          type: 'CUSTOM',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Top Start',
                                                value: 'top-start',
                                              },
                                              {
                                                name: 'Top',
                                                value: 'top',
                                              },
                                              {
                                                name: 'Top End',
                                                value: 'top-end',
                                              },
                                              {
                                                name: 'Right',
                                                value: 'right',
                                              },
                                              {
                                                name: 'Left',
                                                value: 'left',
                                              },
                                              {
                                                name: 'Botttom Start',
                                                value: 'bottom-start',
                                              },
                                              {
                                                name: 'Bottom',
                                                value: 'bottom',
                                              },
                                              {
                                                name: 'Bottom End',
                                                value: 'bottom-end',
                                              },
                                            ],
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Tooltip Background',
                                          key: 'tooltipBackground',
                                          value: 'Medium',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          type: 'COLOR',
                                          label: 'Tooltip Text',
                                          key: 'tooltipText',
                                          value: 'Black',
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'addTooltip',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                        {
                                          value: false,
                                          label: 'Advanced settings',
                                          key: 'advancedSettings',
                                          type: 'TOGGLE',
                                        },
                                        {
                                          type: 'VARIABLE',
                                          label: 'Test attribute',
                                          key: 'dataComponentAttribute',
                                          value: ['Button'],
                                          configuration: {
                                            condition: {
                                              type: 'SHOW',
                                              option: 'advancedSettings',
                                              comparator: 'EQ',
                                              value: true,
                                            },
                                          },
                                        },
                                      ],
                                      descendants: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'Box',
                      options: [
                        {
                          value: 'none',
                          label: 'Alignment',
                          key: 'alignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Left', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Right', value: 'flex-end' },
                              { name: 'Justified', value: 'space-between' },
                            ],
                          },
                        },
                        {
                          value: 'none',
                          label: 'Vertical alignment',
                          key: 'valignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Top', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Bottom', value: 'flex-end' },
                            ],
                          },
                        },
                        {
                          value: true,
                          label: 'Stretch (when in flex container)',
                          key: 'stretch',
                          type: 'TOGGLE',
                        },
                        {
                          value: false,
                          label: 'Transparent',
                          key: 'transparent',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'SIZE',
                          label: 'Height',
                          key: 'height',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Width',
                          key: 'width',
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                          label: 'Outer space',
                          key: 'outerSpacing',
                          type: 'SIZES',
                        },
                        {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                          label: 'Inner space',
                          key: 'innerSpacing',
                          type: 'SIZES',
                        },
                        {
                          value: false,
                          label: 'Show positioning options',
                          key: 'positioningOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'static',
                          label: 'Position',
                          key: 'position',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Static', value: 'static' },
                              { name: 'Relative', value: 'relative' },
                              { name: 'Absolute', value: 'absolute' },
                              { name: 'Fixed', value: 'fixed' },
                              { name: 'Sticky', value: 'sticky' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Top position',
                          key: 'top',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Right position',
                          key: 'right',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Bottom position',
                          key: 'bottom',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Left position',
                          key: 'left',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: true,
                          label: 'Show background options',
                          key: 'backgroundOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'Light',
                          label: 'Background color',
                          key: 'backgroundColor',
                          type: 'COLOR',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 20,
                          label: 'Background color opacity',
                          key: 'backgroundColorAlpha',
                          type: 'NUMBER',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: [''],
                          label: 'Background url',
                          key: 'backgroundUrl',
                          type: 'VARIABLE',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'initial',
                          label: 'Background size',
                          key: 'backgroundSize',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Initial', value: 'initial' },
                              { name: 'Contain', value: 'contain' },
                              { name: 'Cover', value: 'cover' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'center center',
                          label: 'Background position',
                          key: 'backgroundPosition',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Left top', value: 'left top' },
                              { name: 'Left center', value: 'left center' },
                              { name: 'Left bottom', value: 'left bottom' },
                              { name: 'Center top', value: 'center top' },
                              { name: 'Center center', value: 'center center' },
                              { name: 'Center bottom', value: 'center bottom' },
                              { name: 'Right top', value: 'right top' },
                              { name: 'Right center', value: 'right center' },
                              { name: 'Right bottom', value: 'right bottom' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'no-repeat',
                          label: 'Background repeat',
                          key: 'backgroundRepeat',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'no-repeat' },
                              { name: 'X', value: 'repeat-x' },
                              { name: 'Y', value: 'repeat-y' },
                              { name: 'All', value: 'repeat' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'Transparent',
                          label: 'Border color',
                          key: 'borderColor',
                          type: 'COLOR',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Border thickness',
                          key: 'borderWidth',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'solid',
                          label: 'Border style',
                          key: 'borderStyle',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Solid', value: 'solid' },
                              { name: 'Dashed', value: 'dashed' },
                              { name: 'Dotted', value: 'dotted' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Border radius',
                          key: 'borderRadius',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: false,
                          label: 'Advanced settings',
                          key: 'advancedSettings',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'VARIABLE',
                          label: 'Test attribute',
                          key: 'dataComponentAttribute',
                          value: ['Box'],
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'advancedSettings',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                      ],
                      descendants: [
                        {
                          name: 'Row',
                          options: [
                            {
                              type: 'CUSTOM',
                              label: 'Width',
                              key: 'maxRowWidth',
                              value: 'XL',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'S', value: 'S' },
                                  { name: 'M', value: 'M' },
                                  { name: 'L', value: 'L' },
                                  { name: 'XL', value: 'XL' },
                                  { name: 'Full', value: 'Full' },
                                ],
                              },
                            },
                            {
                              value: '100%',
                              label: 'Height',
                              key: 'rowHeight',
                              type: 'TEXT',
                              configuration: {
                                as: 'UNIT',
                              },
                            },
                            {
                              value: 'transparent',
                              label: 'Background color',
                              key: 'backgroundColor',
                              type: 'COLOR',
                            },
                            {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                              label: 'Outer space',
                              key: 'outerSpacing',
                              type: 'SIZES',
                            },
                            {
                              value: false,
                              label: 'Advanced settings',
                              key: 'advancedSettings',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'VARIABLE',
                              label: 'Test attribute',
                              key: 'dataComponentAttribute',
                              value: ['Row'],
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'advancedSettings',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
                            },
                          ],
                          descendants: [
                            {
                              name: 'Column',
                              ref: {
                                id: '#rootColumn',
                              },
                              options: [
                                {
                                  label: 'Toggle visibility',
                                  key: 'visible',
                                  value: true,
                                  type: 'TOGGLE',
                                  configuration: {
                                    as: 'VISIBILITY',
                                  },
                                },
                                {
                                  value: '12',
                                  label: 'Column width',
                                  key: 'columnWidth',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: '12',
                                  label: 'Column width (tablet landscape)',
                                  key: 'columnWidthTabletLandscape',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: '12',
                                  label: 'Column width (tablet portrait)',
                                  key: 'columnWidthTabletPortrait',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: '12',
                                  label: 'Column width (mobile)',
                                  key: 'columnWidthMobile',
                                  type: 'CUSTOM',
                                  configuration: {
                                    as: 'DROPDOWN',
                                    dataType: 'string',
                                    allowedInput: [
                                      {
                                        name: 'Fit content',
                                        value: 'fitContent',
                                      },
                                      { name: 'Flexible', value: 'flexible' },
                                      { name: 'Hidden', value: 'hidden' },
                                      { name: '1', value: '1' },
                                      { name: '2', value: '2' },
                                      { name: '3', value: '3' },
                                      { name: '4', value: '4' },
                                      { name: '5', value: '5' },
                                      { name: '6', value: '6' },
                                      { name: '7', value: '7' },
                                      { name: '8', value: '8' },
                                      { name: '9', value: '9' },
                                      { name: '10', value: '10' },
                                      { name: '11', value: '11' },
                                      { name: '12', value: '12' },
                                    ],
                                  },
                                },
                                {
                                  value: '',
                                  label: 'Height',
                                  key: 'columnHeight',
                                  type: 'TEXT',
                                  configuration: {
                                    as: 'UNIT',
                                  },
                                },
                                {
                                  value: 'transparent',
                                  label: 'Background color',
                                  key: 'backgroundColor',
                                  type: 'COLOR',
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Horizontal Alignment',
                                  key: 'horizontalAlignment',
                                  value: 'inherit',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Left', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'flex-end' },
                                    ],
                                  },
                                },
                                {
                                  type: 'CUSTOM',
                                  label: 'Vertical Alignment',
                                  key: 'verticalAlignment',
                                  value: 'inherit',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'None', value: 'inherit' },
                                      { name: 'Top', value: 'flex-start' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Bottom', value: 'flex-end' },
                                    ],
                                  },
                                },
                                {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                  label: 'Outer space',
                                  key: 'outerSpacing',
                                  type: 'SIZES',
                                },
                                {
                                  value: ['S', 'S', 'S', 'S'],
                                  label: 'Inner space',
                                  key: 'innerSpacing',
                                  type: 'SIZES',
                                },
                                {
                                  value: false,
                                  label: 'Advanced settings',
                                  key: 'advancedSettings',
                                  type: 'TOGGLE',
                                },
                                {
                                  type: 'VARIABLE',
                                  label: 'Test attribute',
                                  key: 'dataComponentAttribute',
                                  value: ['Column'],
                                  configuration: {
                                    condition: {
                                      type: 'SHOW',
                                      option: 'advancedSettings',
                                      comparator: 'EQ',
                                      value: true,
                                    },
                                  },
                                },
                              ],
                              descendants: [],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'Box',
                      options: [
                        {
                          value: 'none',
                          label: 'Alignment',
                          key: 'alignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Left', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Right', value: 'flex-end' },
                              { name: 'Justified', value: 'space-between' },
                            ],
                          },
                        },
                        {
                          value: 'none',
                          label: 'Vertical alignment',
                          key: 'valignment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Top', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Bottom', value: 'flex-end' },
                            ],
                          },
                        },
                        {
                          value: false,
                          label: 'Stretch (when in flex container)',
                          key: 'stretch',
                          type: 'TOGGLE',
                        },
                        {
                          value: false,
                          label: 'Transparent',
                          key: 'transparent',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'SIZE',
                          label: 'Height',
                          key: 'height',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Width',
                          key: 'width',
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        },
                        {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                          label: 'Outer space',
                          key: 'outerSpacing',
                          type: 'SIZES',
                        },
                        {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                          label: 'Inner space',
                          key: 'innerSpacing',
                          type: 'SIZES',
                        },
                        {
                          value: false,
                          label: 'Show positioning options',
                          key: 'positioningOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'static',
                          label: 'Position',
                          key: 'position',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Static', value: 'static' },
                              { name: 'Relative', value: 'relative' },
                              { name: 'Absolute', value: 'absolute' },
                              { name: 'Fixed', value: 'fixed' },
                              { name: 'Sticky', value: 'sticky' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Top position',
                          key: 'top',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Right position',
                          key: 'right',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Bottom position',
                          key: 'bottom',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Left position',
                          key: 'left',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'positioningOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: true,
                          label: 'Show background options',
                          key: 'backgroundOptions',
                          type: 'TOGGLE',
                        },
                        {
                          value: 'Light',
                          label: 'Background color',
                          key: 'backgroundColor',
                          type: 'COLOR',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 20,
                          label: 'Background color opacity',
                          key: 'backgroundColorAlpha',
                          type: 'NUMBER',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: [''],
                          label: 'Background url',
                          key: 'backgroundUrl',
                          type: 'VARIABLE',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'initial',
                          label: 'Background size',
                          key: 'backgroundSize',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Initial', value: 'initial' },
                              { name: 'Contain', value: 'contain' },
                              { name: 'Cover', value: 'cover' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'center center',
                          label: 'Background position',
                          key: 'backgroundPosition',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'DROPDOWN',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Left top', value: 'left top' },
                              { name: 'Left center', value: 'left center' },
                              { name: 'Left bottom', value: 'left bottom' },
                              { name: 'Center top', value: 'center top' },
                              { name: 'Center center', value: 'center center' },
                              { name: 'Center bottom', value: 'center bottom' },
                              { name: 'Right top', value: 'right top' },
                              { name: 'Right center', value: 'right center' },
                              { name: 'Right bottom', value: 'right bottom' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'no-repeat',
                          label: 'Background repeat',
                          key: 'backgroundRepeat',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'no-repeat' },
                              { name: 'X', value: 'repeat-x' },
                              { name: 'Y', value: 'repeat-y' },
                              { name: 'All', value: 'repeat' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'inherit',
                          label: 'Background attachment',
                          key: 'backgroundAttachment',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'Inherit', value: 'inherit' },
                              { name: 'Scroll', value: 'scroll' },
                              { name: 'Fixed', value: 'fixed' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'Transparent',
                          label: 'Border color',
                          key: 'borderColor',
                          type: 'COLOR',
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Border thickness',
                          key: 'borderWidth',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: 'solid',
                          label: 'Border style',
                          key: 'borderStyle',
                          type: 'CUSTOM',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'none' },
                              { name: 'Solid', value: 'solid' },
                              { name: 'Dashed', value: 'dashed' },
                              { name: 'Dotted', value: 'dotted' },
                            ],
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          type: 'SIZE',
                          label: 'Border radius',
                          key: 'borderRadius',
                          value: '',
                          configuration: {
                            as: 'UNIT',
                            condition: {
                              type: 'SHOW',
                              option: 'backgroundOptions',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                        {
                          value: false,
                          label: 'Advanced settings',
                          key: 'advancedSettings',
                          type: 'TOGGLE',
                        },
                        {
                          type: 'VARIABLE',
                          label: 'Test attribute',
                          key: 'dataComponentAttribute',
                          value: ['Box'],
                          configuration: {
                            condition: {
                              type: 'SHOW',
                              option: 'advancedSettings',
                              comparator: 'EQ',
                              value: true,
                            },
                          },
                        },
                      ],
                      descendants: [
                        {
                          name: 'Text',
                          options: [
                            {
                              type: 'VARIABLE',
                              label: 'Content',
                              key: 'content',
                              value: ['Powered by Betty Blocks'],
                              configuration: {
                                as: 'MULTILINE',
                              },
                            },
                            {
                              type: 'TOGGLE',
                              label: 'Display Rich Text',
                              key: 'useInnerHtml',
                              value: false,
                            },
                            {
                              value: 'Body1',
                              label: 'Type',
                              key: 'type',
                              type: 'FONT',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Text Alignment',
                              key: 'textAlignment',
                              value: 'center',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Left', value: 'left' },
                                  { name: 'Center', value: 'center' },
                                  { name: 'Right', value: 'right' },
                                ],
                              },
                            },
                            {
                              value: ['L', 'L', 'L', 'L'],
                              label: 'Outer space',
                              key: 'outerSpacing',
                              type: 'SIZES',
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Link to',
                              key: 'linkType',
                              value: 'internal',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Internal page', value: 'internal' },
                                  { name: 'External page', value: 'external' },
                                ],
                              },
                            },
                            {
                              value: '_self',
                              label: 'Open in',
                              key: 'linkTarget',
                              type: 'CUSTOM',
                              configuration: {
                                as: 'BUTTONGROUP',
                                dataType: 'string',
                                allowedInput: [
                                  { name: 'Current Tab', value: '_self' },
                                  { name: 'New Tab', value: '_blank' },
                                ],
                              },
                            },
                            {
                              value: '',
                              label: 'Page',
                              key: 'linkTo',
                              type: 'ENDPOINT',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'linkType',
                                  comparator: 'EQ',
                                  value: 'internal',
                                },
                              },
                            },
                            {
                              value: [''],
                              label: 'URL',
                              key: 'linkToExternal',
                              type: 'VARIABLE',
                              configuration: {
                                placeholder: 'Starts with https:// or http://',
                                condition: {
                                  type: 'SHOW',
                                  option: 'linkType',
                                  comparator: 'EQ',
                                  value: 'external',
                                },
                              },
                            },
                            {
                              value: true,
                              label: 'Styles',
                              key: 'styles',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'COLOR',
                              label: 'Text color',
                              key: 'textColor',
                              value: 'Medium',
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'styles',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
                            },
                            {
                              type: 'CUSTOM',
                              label: 'Font weight',
                              key: 'fontWeight',
                              value: '400',
                              configuration: {
                                as: 'DROPDOWN',
                                dataType: 'string',
                                allowedInput: [
                                  { name: '100', value: '100' },
                                  { name: '200', value: '200' },
                                  { name: '300', value: '300' },
                                  { name: '400', value: '400' },
                                  { name: '500', value: '500' },
                                  { name: '600', value: '600' },
                                  { name: '700', value: '700' },
                                  { name: '800', value: '800' },
                                  { name: '900', value: '900' },
                                ],
                                condition: {
                                  type: 'SHOW',
                                  option: 'styles',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
                            },
                            {
                              value: false,
                              label: 'Advanced settings',
                              key: 'advancedSettings',
                              type: 'TOGGLE',
                            },
                            {
                              type: 'VARIABLE',
                              label: 'Test attribute',
                              key: 'dataComponentAttribute',
                              value: ['Text'],
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'advancedSettings',
                                  comparator: 'EQ',
                                  value: true,
                                },
                              },
                            },
                          ],
                          descendants: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}))();
