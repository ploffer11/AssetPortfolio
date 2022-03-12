import create from "zustand";

const useStore = create((set, get) => ({
  buyPriceSum: 0,
  setBuyPriceSum: (buyPriceSum) => {
    set((state) => ({
      buyPriceSum,
    }));
  },

  sellPriceSum: 0,
  setSellPriceSum: (sellPriceSum) => {
    set((state) => ({
      sellPriceSum,
    }));
  },

  checked: [],
  setCheckedIndex: (idx, chk) => {
    set((state) => {
      let checkedCopy = [...state.checked];
      checkedCopy[idx] = chk;
      return { checked: checkedCopy };
    });
  },
  setCheckedAll: (chk) => {
    set((state) => ({
      checked: new Array(state.checked.length).fill(chk),
    }));
  },
  initChecked: (length) => {
    set((state) => ({
      checked: new Array(length).fill(false),
    }));
  },
  addChecked: (chk) => {
    set((state) => ({
      checked: state.checked.concat(chk),
    }));
  },

  newAssetCount: 0,
  addNewAssetCount: () => {
    set((state) => ({ newAssetCount: state.newAssetCount + 1 }));
  },

  // 이게 -1이면 정렬하지 않은 asset을 렌더링함
  sortColumnIndex: -1,
  setSortColumnIndex: (idx) => {
    set((state) => ({ sortColumnIndex: idx }));
  },

  asset: [],
  setAsset: (asset) => {
    set((state) => ({ asset }));
  },
  createAsset: (newAsset) => {
    return Object.assign(
      {
        index: 0,
        count: 0,
        buyPrice: 0,
        sellPrice: 0,
        orderIndex: newAsset.index,
        isUpdateNow: true,
        currency: "KRW",
        currencySymbol: "₩",
        assetCode: "",
        name: "",
        description: "",
        key: Math.random().toString(36),
      },
      newAsset
    );
  },
  addAsset: (asset) => {
    set((state) => {
      asset.index = state.asset.length;
      console.log("add asset", state.asset);
      return { asset: state.asset.concat(state.createAsset(asset)) };
    });
  },
  changeAsset: (idx, cols) =>
    set((state) => {
      let assetCopy = [...state.asset];
      Object.assign(assetCopy[idx], cols);
      return { asset: assetCopy };
    }),
  getSortAsset: () => {
    console.log("get sort asset");
    return [...get().asset].sort((x, y) => x.orderIndex - y.orderIndex);
  },
  compare: (getValue, x, y) => {
    if (getValue(x) === getValue(y)) return 0;
    else return getValue(x) < getValue(y) ? -1 : 1;
  },
  // column[idx]를 기준으로 정렬한 뒤, orderIdx만 바꾼다.
  sortAssetColumn: (idx, ascend) => {
    let getValueArray = [
      (row) => row["index"],
      (row) => row["name"],
      (row) => row["count"],
      (row) => row["buyPrice"],
      (row) => row["sellPrice"],
      (row) => row["buyPrice"] * row["count"],
      (row) => row["sellPrice"] * row["count"],
      (row) =>
        (row["sellPrice"] * row["count"] - row["buyPrice"] * row["count"]) /
        (row["buyPrice"] * row["count"]),
      (row) => row["description"],
    ];
    let assetSorted = [...get().asset].sort((x, y) => {
      return (ascend ? 1 : -1) * get().compare(getValueArray[idx], x, y);
    });
    let assetCopy = [...get().asset];
    assetSorted.map(({ index }, sortedIdx) => {
      assetCopy[index].orderIndex = sortedIdx;
    });
    get().setAsset(assetCopy);
  },

  sortAsset: () => {
    get().setSortColumnIndex(-1);
    get().setAsset(
      get()
        .getSortAsset()
        .map((row, idx) => {
          row.orderIndex = row.index = idx;
          return row;
        })
    );
  },

  insertFromIndex: 0,
  setInsertFromIndex: (idx) => {
    set((state) => ({
      insertFromIndex: idx,
    }));
  },

  insertToIdx: 0,
  setInsertToIndex: (idx) => {
    set((state) => ({
      insertToIndex: idx,
    }));
  },

  placeholder: null,
  setPlaceholder: (placeholder) => {
    set((state) => ({ placeholder }));
  },

  insertAsset: (insertFromIndex, insertToIndex) => {
    if (insertToIndex === null || isNaN(insertToIndex))
      insertToIndex = get().asset.length;

    let assetCopy = [...get().asset];
    let selectAsset = assetCopy[insertFromIndex];
    assetCopy[insertFromIndex] = null;
    assetCopy.splice(insertToIndex, 0, selectAsset);
    assetCopy.splice(assetCopy.indexOf(null), 1);

    get().setAsset(
      assetCopy.map((row, idx) => {
        row.orderIndex = row.index = idx;
        return row;
      })
    );
  },
}));

export default useStore;
