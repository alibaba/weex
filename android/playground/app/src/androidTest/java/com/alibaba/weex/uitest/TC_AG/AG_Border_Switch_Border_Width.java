package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Border_Switch_Border_Width extends TestFlow {
	public AG_Border_Switch_Border_Width() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Border");
		testMap.put("testChildCaseInit", "AG_Border_Switch_Border_Width");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "0");
				put("screenshot", "AG_Border_Switch_Border_Width_01_0");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "1");
				put("screenshot", "AG_Border_Switch_Border_Width_02_1");
			}
		});
		testMap.put("step3",new TreeMap(){
			{
				put("click", "3");
				put("screenshot", "AG_Border_Switch_Border_Width_03_3");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
