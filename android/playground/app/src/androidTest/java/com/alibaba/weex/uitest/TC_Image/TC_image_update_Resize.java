package com.alibaba.weex.uitest.TC_Image;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;

import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class TC_image_update_Resize extends TestFlow {
	public TC_image_update_Resize() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new  HashMap();
		testMap.put("testComponet", "TC_Image");
		testMap.put("testChildCaseInit", "TC_image_update_Resize");
		testMap.put("Step1", "stretch");
		testMap.put("Step1", "cover");
		testMap.put("Step1", "contain");
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
