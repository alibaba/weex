package com.alibaba.weex.fragment;


import android.app.Fragment;
import android.content.Context;
import android.view.Menu;
import android.view.MenuInflater;

import com.alibaba.weex.R;

/**
 * A simple {@link Fragment} subclass. create an instance of this fragment.
 */
public class BaseFragment extends Fragment {

  @Override
  public void onAttach(Context context) {
    super.onAttach(context);
    setHasOptionsMenu(true);
  }

  @Override
  public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
    menu.clear();
    inflater.inflate(R.menu.main, menu);
    super.onCreateOptionsMenu(menu, inflater);
  }
}
