package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Placeholder extends TestFlow {
	public AG_Input_Input_Placeholder() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Placeholder");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "");
				put("screenshot", "AG_Input_Input_Placeholder_01_");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "placeholder");
				put("screenshot", "AG_Input_Input_Placeholder_02_placeholder");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
