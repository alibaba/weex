package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Font_Weight extends TestFlow {
	public AG_Input_Input_Font_Weight() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Font_Weight");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "normal");
				put("screenshot", "AG_Input_Input_Font_Weight_01_normal");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "bold");
				put("screenshot", "AG_Input_Input_Font_Weight_02_bold");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
