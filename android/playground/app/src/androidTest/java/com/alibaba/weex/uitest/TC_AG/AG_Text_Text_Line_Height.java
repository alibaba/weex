package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Text_Text_Line_Height extends TestFlow {
	public AG_Text_Text_Line_Height() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Text");
		testMap.put("testChildCaseInit", "AG_Text_Text_Line_Height");
		testMap.put("step1",new HashMap(){
			{
				put("click", "-25");
				put("screenshot", "AG_Text_Text_Line_Height_01_-25");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "0");
				put("screenshot", "AG_Text_Text_Line_Height_02_0");
			}
		});
		testMap.put("step3",new HashMap(){
			{
				put("click", "25");
				put("screenshot", "AG_Text_Text_Line_Height_03_25");
			}
		});
		testMap.put("step4",new HashMap(){
			{
				put("click", "50");
				put("screenshot", "AG_Text_Text_Line_Height_04_50");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
