package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Margin_Video_Margin_Left extends TestFlow {
	public AG_Margin_Video_Margin_Left() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Margin");
		testMap.put("testChildCaseInit", "AG_Margin_Video_Margin_Left");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "10");
				put("screenshot", "AG_Margin_Video_Margin_Left_01_10");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "20");
				put("screenshot", "AG_Margin_Video_Margin_Left_02_20");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
