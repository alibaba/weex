package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Text_Align extends TestFlow {
	public AG_Input_Input_Text_Align() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Text_Align");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "left");
				put("screenshot", "AG_Input_Input_Text_Align_01_left");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "center");
				put("screenshot", "AG_Input_Input_Text_Align_02_center");
			}
		});
		testMap.put("step3",new TreeMap(){
			{
				put("click", "right");
				put("screenshot", "AG_Input_Input_Text_Align_03_right");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
