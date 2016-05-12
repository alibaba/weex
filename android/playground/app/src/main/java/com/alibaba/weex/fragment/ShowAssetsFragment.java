package com.alibaba.weex.fragment;


import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.alibaba.weex.R;
import com.alibaba.weex.ShowAssetsActivity;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.constants.Constants;
import com.alibaba.weex.models.AssetsEntity;
import com.alibaba.weex.util.WXAssetsManager;

import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 */
public class ShowAssetsFragment extends BaseFragment {

  private View mView;
  private ListView mListView;
  private AssetsAdapter mAdapter;
  private List<AssetsEntity> mAssetsFolders;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Intent intent = getActivity().getIntent();
    String dir = Constants.ASSETS_ROOT_FOLDER;
    if (intent != null) {
      String args = intent.getStringExtra(Constants.WX_ASSETS_FOLDER);
      dir = args == null ? Constants.ASSETS_ROOT_FOLDER : args;
    }

    mView = View.inflate(getActivity(), R.layout.fragment_show_assets, null);
    mAssetsFolders = WXAssetsManager.getInstance().getAssetsEntity(getActivity(), dir);
    mListView = (ListView) mView.findViewById(R.id.listView);
    mAdapter = new AssetsAdapter();
    mListView.setAdapter(mAdapter);
    mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
      @Override
      public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        AssetsEntity entity = mAssetsFolders.get(position);
        Intent intent;
        if (entity.isFolder) {
          intent = new Intent(getActivity(), ShowAssetsActivity.class);
          intent.putExtra(Constants.WX_ASSETS_FOLDER, entity.path);
          startActivity(intent);
        } else {
          Uri uri = Uri.parse(entity.path);
          intent = new Intent(getActivity(), WXPageActivity.class);
          intent.setData(uri);
          startActivity(intent);
        }

      }
    });
  }

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
                           Bundle savedInstanceState) {
    if (mView.getParent() != null) {
      ((ViewGroup) mView.getParent()).removeView(mView);
    }
    return mView;
  }

  static class ViewHolder {

    public final TextView assetsName;
    public final TextView assetsPath;
    public final ImageView assetsIndicate;

    ViewHolder(TextView assetsName, TextView assetsPath, ImageView assetsIndicate) {
      this.assetsName = assetsName;
      this.assetsPath = assetsPath;
      this.assetsIndicate = assetsIndicate;
    }

    public static ViewHolder create(View rootView) {
      TextView assetsName = (TextView) rootView.findViewById(R.id.assets_name);
      TextView assetsPath = (TextView) rootView.findViewById(R.id.assets_path);
      ImageView assetsIndicate = (ImageView) rootView.findViewById(R.id.assets_indicate);
      return new ViewHolder(assetsName, assetsPath, assetsIndicate);
    }
  }

  class AssetsAdapter extends BaseAdapter {

    @Override
    public int getCount() {
      return mAssetsFolders == null ? 0 : mAssetsFolders.size();
    }

    @Override
    public Object getItem(int position) {
      return mAssetsFolders == null ? null : mAssetsFolders.get(position);
    }

    @Override
    public long getItemId(int position) {
      return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
      ViewHolder holder;
      if (convertView == null) {
        convertView = View.inflate(getActivity(), R.layout.assets_item_layout, null);
        holder = ViewHolder.create(convertView);
        convertView.setTag(holder);
      } else {
        holder = (ViewHolder) convertView.getTag();
      }
      AssetsEntity assetsFolder = (AssetsEntity) getItem(position);
      holder.assetsName.setText(assetsFolder.name);
      holder.assetsPath.setText(assetsFolder.path);
      return convertView;
    }
  }


}
