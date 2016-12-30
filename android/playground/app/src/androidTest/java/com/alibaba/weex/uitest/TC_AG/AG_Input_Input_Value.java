package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Value extends TestFlow {
	public AG_Input_Input_Value() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Value");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "AAA");
				put("screenshot", "AG_Input_Input_Value_01_AAA");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "BBB");
				put("screenshot", "AG_Input_Input_Value_02_BBB");
			}
		});
		testMap.put("step3",new TreeMap(){
			{
				put("click", "");
				put("screenshot", "AG_Input_Input_Value_03_");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
