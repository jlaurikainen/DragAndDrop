import React, { useMemo } from "react";
import Select, { MenuListComponentProps, OptionTypeBase, Props } from "react-select";
import { FixedSizeList } from "react-window";
import styled from "styled-components";

const OPTION_HEIGHT = 32;

const SingleMenuList = (props: MenuListComponentProps<any, boolean>) => {
  const { children, maxHeight } = props;

  if (!children) return null;

  const childArray = React.Children.toArray(children);

  const childCount = childArray.length;
  const listHeight = childCount * OPTION_HEIGHT > maxHeight ? maxHeight : childCount * OPTION_HEIGHT;

  return (
    <>
      <FixedSizeList height={listHeight} itemCount={childCount} itemSize={OPTION_HEIGHT} width="100%">
        {({ index, style }) => (
          <div key={index} style={style}>
            {childArray[index]}
          </div>
        )}
      </FixedSizeList>
    </>
  );
};

const GroupSingleMenuList = (props: MenuListComponentProps<any, boolean>) => {
  const { children, maxHeight } = props;

  if (!children) return null;

  const childArray = React.Children.toArray(children);

  const childCount = childArray.length;
  const listHeight = childCount * OPTION_HEIGHT > maxHeight ? maxHeight : childCount * OPTION_HEIGHT;

  return (
    <>
      <FixedSizeList height={listHeight} itemCount={childCount} itemSize={OPTION_HEIGHT} width="100%">
        {({ index, style }) => (
          <div key={index} style={style}>
            {childArray[index]}
          </div>
        )}
      </FixedSizeList>
    </>
  );
};

const MultiMenuList = (props: MenuListComponentProps<any, boolean>) => {
  const { children, getValue, maxHeight, options, setValue } = props;

  if (!children) return null;

  const value = getValue();

  const handleSelectGroup = (group: any[]) => {
    const unselected = group.filter((o) => !value.includes(o) && !o.isDisabled);

    if (unselected.length > 0) {
      setValue([...value, ...unselected], "select-option");
      return;
    }

    setValue(
      value.filter((o) => !group.includes(o)),
      "deselect-option"
    );
  };

  const flatGroups = React.Children.map(children as JSX.Element[], (c, i) => {
    const allSelected = options[i].options.filter((o: any) => !o.isDisabled).every((o: any) => value.includes(o));

    return [
      <GroupHeading onClick={() => handleSelectGroup(options[i].options)}>
        <input type="checkbox" defaultChecked={allSelected} />
        {options[i].label}
      </GroupHeading>,
      ...c.props.children,
    ];
  });

  const childCount = flatGroups.length;
  const listHeight =
    childCount * OPTION_HEIGHT > maxHeight ? maxHeight - (maxHeight % OPTION_HEIGHT) : childCount * OPTION_HEIGHT;

  return (
    <>
      <FixedSizeList height={listHeight} itemCount={childCount} itemSize={OPTION_HEIGHT} width="100%">
        {({ index, style }) => (
          <div key={index} style={style}>
            {flatGroups[index]}
          </div>
        )}
      </FixedSizeList>
    </>
  );
};

const GroupMultiMenuList = (props: MenuListComponentProps<any, boolean>) => {
  const { children, getValue, maxHeight, options, setValue } = props;

  if (!children) return null;

  const value = getValue();

  const handleSelectGroup = (group: any[]) => {
    const unselected = group.filter((o) => !value.includes(o) && !o.isDisabled);

    if (unselected.length > 0) {
      setValue([...value, ...unselected], "select-option");
      return;
    }

    setValue(
      value.filter((o) => !group.includes(o)),
      "deselect-option"
    );
  };

  const flatGroups = React.Children.map(children as JSX.Element[], (c, i) => {
    const allSelected = options[i].options.filter((o: any) => !o.isDisabled).every((o: any) => value.includes(o));

    return [
      <GroupHeading onClick={() => handleSelectGroup(options[i].options)}>
        <input type="checkbox" defaultChecked={allSelected} />
        {options[i].label}
      </GroupHeading>,
      ...c.props.children,
    ];
  });

  const childCount = flatGroups.length;
  const listHeight =
    childCount * OPTION_HEIGHT > maxHeight ? maxHeight - (maxHeight % OPTION_HEIGHT) : childCount * OPTION_HEIGHT;

  return (
    <>
      <FixedSizeList height={listHeight} itemCount={childCount} itemSize={OPTION_HEIGHT} width="100%">
        {({ index, style }) => (
          <div key={index} style={style}>
            {flatGroups[index]}
          </div>
        )}
      </FixedSizeList>
    </>
  );
};

const Shit = <T extends OptionTypeBase = { label: string; value: any }, B extends boolean = false>(
  props: Props<T, B>
) => {
  const { isMulti, options } = props;

  const selectMultiMenu = useMemo(() => {
    if (options && options.every((o) => "options" in o)) {
      if (isMulti) {
        return GroupMultiMenuList;
      }

      return GroupSingleMenuList;
    }

    if (isMulti) {
      return MultiMenuList;
    }

    return SingleMenuList;
  }, [isMulti, options]);

  return (
    <Select
      components={{ MenuList: selectMultiMenu }}
      styles={{
        option: (s) => ({
          ...s,
          height: OPTION_HEIGHT,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
        }),
      }}
      theme={(t) => ({
        ...t,
        borderRadius: 0,
        spacing: {
          ...t.spacing,
          menuGutter: 4,
        },
      })}
      menuIsOpen
      {...props}
    />
  );
};

export default Shit;

const GroupHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: ${OPTION_HEIGHT}px;
  color: gray;

  input {
    padding: 8px;
  }
`;
